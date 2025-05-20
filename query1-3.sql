SELECT customer.first_name, customer.last_name, rental.rental_date
FROM rental
JOIN customer ON rental.customer_id = customer.customer_id
WHERE rental.return_date IS NULL
ORDER BY rental.rental_date ASC
LIMIT 1;