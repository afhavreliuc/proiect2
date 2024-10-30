import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { searchValue, page } = req.query; 
  
    if (typeof searchValue !== 'string') {
      return res.status(400).json({ error: 'Invalid search value' });
    }

    const currentPage = parseInt(page as string) || 0; 
    const pageSize = 20; 
  
    try {
      const results = await prisma.tabelcompanii.findMany({
        skip: currentPage * pageSize, 
        take: pageSize,
        where: {
          OR: [
            { DENUMIRE: { contains: searchValue, mode: 'insensitive' } },
            { CUI: { contains: searchValue, mode: 'insensitive' } },
            { COD_INMATRICULARE: { contains: searchValue, mode: 'insensitive' } },
            { EUID: { contains: searchValue, mode: 'insensitive' } },
            { STARE_FIRMA: { contains: searchValue, mode: 'insensitive' } },
            { ADRESA_COMPLETA: { contains: searchValue, mode: 'insensitive' } },
            { ADR_TARA: { contains: searchValue, mode: 'insensitive' } },
            { ADR_LOCALITATE: { contains: searchValue, mode: 'insensitive' } },
            { ADR_JUDET: { contains: searchValue, mode: 'insensitive' } },
            { ADR_DEN_STRADA: { contains: searchValue, mode: 'insensitive' } },
            { ADR_DEN_NR_STRADA: { contains: searchValue, mode: 'insensitive' } },
            { ADR_BLOC: { contains: searchValue, mode: 'insensitive' } },
            { ADR_SCARA: { contains: searchValue, mode: 'insensitive' } },
            { ADR_ETAJ: { contains: searchValue, mode: 'insensitive' } },
            { ADR_APARTAMENT: { contains: searchValue, mode: 'insensitive' } },
            { ADR_COD_POSTAL: { contains: searchValue, mode: 'insensitive' } },
            { ADR_SECTOR: { contains: searchValue, mode: 'insensitive' } },
            { ADR_COMPLETARE: { contains: searchValue, mode: 'insensitive' } },
          ],
        },
      });
  
      const serializedResults = results.map(result => ({
        ...result,
        id: result.id.toString(), 
      }));
  
      res.status(200).json(serializedResults);
    } catch (error) {
      console.error('Error executing Prisma query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
