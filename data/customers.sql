INSERT INTO customers (
    first_name, last_name, email, phone, address, district, city, province, post_code, notes, active, created_at, updated_at
) VALUES
    ('Budi', 'Santoso', 'budi.santoso@example.com', '081234567890', 'Jl. Merdeka No.123', '475', '41', '6', '8154', 'Pelanggan sejak 2020', true, now(), now()), 
    ('Siti', 'Rahma', 'siti.rahma@example.com', '082198765432', 'Jl. Sudirman No.456', '761', '64', '9', '8705', 'Pelanggan VIP', true, now(), now()),
    ('Dewi', 'Lestari', 'dewi.lestari@example.com', '085612345678', 'Jl. Diponegoro No.789', '2500', '159', '11', '2595', NULL, true, now(), now()),
    ('Agus', 'Wibowo', 'agus.wibowo@example.com', '081355556666', 'Jl. Ahmad Yani No.321', '1788', '116', '10', '704', 'Pelanggan prioritas', true, now(), now()),
    ('Indah', 'Putri', 'indah.putri@example.com', '087722223333', 'Jl. Gatot Subroto No.654', '456', '39', '5', '2808', 'Pelanggan baru', true, now(), now());
