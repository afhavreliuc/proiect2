// page.tsx
import prisma from '../lib/prisma'
import UserList from './UserList'

const Page = async ({ searchParams }: { searchParams: { page: string, search?: string } }) => {
  const { page, search } = await searchParams; // Added search parameter
  const currentPage = parseInt(page) || 0; // Get page from query params
  const pageSize = 20;

  // Construct the query filter based on the search term
  const whereClause = search ? { DENUMIRE: { contains: search, mode: 'insensitive' } } : {};

  const users = await prisma.tabelcompanii.findMany({
    skip: currentPage * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <UserList users={users} results={search ? users : undefined} currentPage={currentPage} />
      <div>
        <a href={`?page=${currentPage - 1}`} disabled={currentPage === 0} style={{ pointerEvents: currentPage === 0 ? 'none' : 'auto', color: currentPage === 0 ? '#ccc' : '#000' }}>Previous</a>
        <a href={`?page=${currentPage + 1}`} disabled={users.length < pageSize}>Next</a>
      </div>
    </div>
  )
}

export default Page
