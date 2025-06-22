import fs from 'fs/promises';
import path from 'path';
import sequelize from '../config/database.js';
import { Op } from 'sequelize';

const models = sequelize.models;

export const cleanupUnusedImages = async (req, res, next) => {
    console.log('[CLEANUP] --- Starting Cleanup Process ---');
    try {
        const uploadsDir = path.join(process.cwd(), 'uploads');
        console.log(`[CLEANUP] Reading directory: ${uploadsDir}`);
        let allFilesInDir;
        try {
            allFilesInDir = await fs.readdir(uploadsDir);
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.log('[CLEANUP] Uploads directory does not exist.');
                return res.json({ message: 'Uploads directory does not exist. Nothing to clean.', deletedCount: 0 });
            }
            throw e;
        }
        console.log(`[CLEANUP] Found ${allFilesInDir.length} files in directory.`);

        const usedUrls = new Set();
        console.log('[CLEANUP] Starting to collect used URLs from DB...');

        for (const modelName in models) {
            const model = models[modelName];
            const attributes = Object.keys(model.getAttributes());
            console.log(`[CLEANUP]  - Processing model: ${modelName}`);

            for (const attributeName of attributes) {
                const attribute = model.getAttributes()[attributeName];
                if (attribute.type.constructor.name === 'STRING' || attribute.type.constructor.name === 'TEXT') {
                    const records = await model.findAll({
                        attributes: [attributeName],
                        // Теперь sequelize.Op.ne будет работать
                        where: { [attributeName]: { [Op.ne]: null } }
                    });

                    for (const record of records) {
                        const value = record[attributeName];
                        if (typeof value === 'string' && value.startsWith('/uploads/')) {
                            usedUrls.add(path.basename(value));
                        }
                    }
                }
            }
        }
        console.log(`[CLEANUP] Finished collecting. Total used URLs: ${usedUrls.size}`);

        const filesToDelete = allFilesInDir.filter(file => !usedUrls.has(file));
        console.log(`[CLEANUP] Found ${filesToDelete.length} files to delete.`);

        let deletedCount = 0;
        for (const file of filesToDelete) {
            try {
                await fs.unlink(path.join(uploadsDir, file));
                deletedCount++;
            } catch (unlinkError) {
                console.error(`Failed to delete file: ${file}`, unlinkError);
            }
        }
        console.log(`[CLEANUP] Deleted ${deletedCount} files.`);

        console.log('[CLEANUP] --- Cleanup Process Finished ---');
        res.json({
            message: `Cleanup complete. ${deletedCount} unused images deleted.`,
            deletedCount,
            totalFilesInDir: allFilesInDir.length,
            totalUsedFiles: usedUrls.size,
            filesToDelete,
        });

    } catch (error) {
        console.error('[CLEANUP] --- ERROR ---', error);
        next(error);
    }
};