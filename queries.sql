-- 1. Write a query to get all books that have never been borrowed (Book Name, Author)
SELECT
    b.book_name,
    b.book_author
FROM book b
LEFT JOIN issuance i
    ON b.book_id = i.book_id
WHERE i.book_id IS NULL;


-- 2. Write a query that can list the outstanding books at any given point in time
-- (Member Name, Book Name, Issued Date, Target Return Date, Author)
SELECT
    m.mem_name AS "Member Name",
    b.book_name AS "Book Name",
    i.issuance_date AS "Issued Date",
    i.target_return_date AS "Target Return Date",
    b.book_author AS "Author"
FROM issuance i
JOIN member m
    ON i.issuance_member = m.mem_id
JOIN book b
    ON i.book_id = b.book_id
WHERE i.issuance_status = 'ISSUED';


-- 3. Write a query to extract the top 10 most borrowed books
-- (Book Name, # of times borrowed, # of Members that borrowed)
SELECT
    b.book_name AS "Book Name",
    COUNT(i.issuance_id) AS "# of times borrowed",
    COUNT(DISTINCT i.issuance_member) AS "# of Members that borrowed"
FROM book b
JOIN issuance i
    ON b.book_id = i.book_id
GROUP BY b.book_id, b.book_name
ORDER BY COUNT(i.issuance_id) DESC
LIMIT 10;
