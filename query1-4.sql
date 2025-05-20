SELECT DISTINCT address.address
FROM film
JOIN inventory ON film.film_id = inventory.film_id
JOIN store ON inventory.store_id = store.store_id
JOIN address ON store.address_id = address.address_id
WHERE film.title = 'TWISTED PIRATES';