INSERT INTO customers (
    first_name, last_name, email, phone, address1, address2, city, province, post_code, notes, active, created_at, updated_at
) VALUES
    ('Budi', 'Santoso', 'budi.santoso@example.com', '081234567890', 'Jl. Merdeka No.123', 'RT 04 RW 05', 'Jakarta', 'JK', '10110', 'Pelanggan sejak 2020', true, now(), now()),
    ('Siti', 'Rahma', 'siti.rahma@example.com', '082198765432', 'Jl. Sudirman No.456', NULL, 'Bandung', 'JB', '40123', 'Pelanggan VIP', true, now(), now()),
    ('Dewi', 'Lestari', 'dewi.lestari@example.com', '085612345678', 'Jl. Diponegoro No.789', 'Lantai 2', 'Surabaya', 'JI', '60241', NULL, true, now(), now()),
    ('Agus', 'Wibowo', 'agus.wibowo@example.com', '081355556666', 'Jl. Ahmad Yani No.321', NULL, 'Semarang', 'JT', '50123', 'Pelanggan prioritas', true, now(), now()),
    ('Indah', 'Putri', 'indah.putri@example.com', '087722223333', 'Jl. Gatot Subroto No.654', 'Kav 12', 'Yogyakarta', 'YO', '55281', 'Pelanggan baru', true, now(), now());
