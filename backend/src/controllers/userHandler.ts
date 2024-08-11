import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFlashcards = async (req: Request, res: Response) => {
    try {
        const flashcards = await prisma.flashcard.findMany();
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}