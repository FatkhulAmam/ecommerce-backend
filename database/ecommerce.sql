-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 18 Okt 2020 pada 10.16
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `home` varchar(250) NOT NULL,
  `recipients_name` varchar(25) NOT NULL,
  `recipients_phone` int(15) NOT NULL,
  `address` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL,
  `postal_code` int(10) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `address`
--

INSERT INTO `address` (`id`, `user_id`, `home`, `recipients_name`, `recipients_phone`, `address`, `city`, `postal_code`, `create_at`, `update_at`) VALUES
(2, 3, 'amerika', 'abdur', 2147483647, 'kulas dingin', 'nyu work', 789090, '2020-10-11 15:56:17', '2020-10-18 02:43:42'),
(3, 3, 'amerika', 'abdur', 2147483647, 'kulas dingin', 'nyu work', 789090, '2020-10-18 01:51:54', '2020-10-18 02:43:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `items_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `add_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `items_id`, `amount`, `add_at`, `update_at`) VALUES
(1, 3, 5, 3, '2020-10-01 13:15:00', '2020-10-01 14:33:06'),
(2, 3, 6, 2, '2020-10-01 13:15:00', '2020-10-01 14:33:12'),
(4, 3, 18, 2, '2020-10-01 13:51:45', '2020-10-01 14:33:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(80) NOT NULL,
  `image` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `category_name`, `image`) VALUES
(1, 'topi', ''),
(2, 'baju', ''),
(3, 'gadget', ''),
(4, 'sepatu', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `category` int(11) NOT NULL,
  `input_date` timestamp NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `description`, `category`, `input_date`, `update_date`) VALUES
(5, 'Nike Air MAX pro', 550000, 'Air Max shoes feature one or more translucent pouches of pressurized gas embedded in the midsole and visible from the outside of the shoes', 4, '2020-09-13 00:06:37', '2020-09-26 03:05:42'),
(6, 'Addidas yeezy pro', 1599000, 'Adidas Yeezy is a fashion collaboration between the German sportswear brand Adidas and American rapper Kanye West', 4, '2020-09-13 00:07:35', NULL),
(10, 'Ventela Shoes', 250000, 'Ventella is a canvas shoe made in Indonesia with guaranteed quality and contemporary style', 4, '2020-09-13 00:14:44', NULL),
(14, 'JLB speaker', 250000, 'lG monitor is monitor to cumputer', 3, '2020-09-14 07:51:00', '2020-09-23 15:11:21'),
(15, 'ROBOT mouse', 180000, 'Mouse Robot Wireless M210 2.4G optical black usb Mouse Bluetooth Type: 2.4G Wireless optical mouse', 3, '2020-09-20 09:34:56', NULL),
(16, 'sombrero', 455000, 'sombrero like cowboy hats invented later, were designed in response to the demands of the ', 1, '2020-09-20 09:36:14', '2020-09-28 07:06:41'),
(17, 'NVIDIA G-Force', 5580000, 'RTX  Kartu Grafis dan Laptop NVIDIA® GeForce® RTX ditenagai oleh NVIDIA Turing™, GPU arsitektur tercanggih di dunia untuk gamer dan kreator', 3, '2020-09-20 09:37:36', NULL),
(18, 'Bomber jacket', 250000, 'Discover the latest men\'s bomber jackets with ASOS. Our bomber jacket styles, such as leather & baseball will help to make you stand outr', 2, '2020-09-20 09:43:50', NULL),
(19, 'kebaya', 1250000, ' biasanya dikenakan dengan sarung , atau kain batik panjang - kain panjang dililitkan di pinggang, atau pakaian tenun tradisional', 2, '2020-09-20 09:44:46', NULL),
(20, 'beskap', 1990000, 'Beskap atau jas tutup adalah sejenis kemeja pria resmi dalam tradisi Jawa Mataraman untuk dikenakan pada acara-acara resmi atau penting', 2, '2020-09-20 09:45:25', NULL),
(35, 'sepatu compas', 270000, 'Indonesian local shoes, made by the creative hands of Indonesian youth', 4, '2020-09-24 01:30:32', NULL),
(36, 'sarung', 145000, 'A sarong or sarung is a large tube or length of fabric, often wrapped around the waist, worn in the Indian subcontinent, Southeast Asia, Sri lanka, the Arabian', 2, '2020-09-28 00:29:30', '2020-09-28 06:53:52'),
(37, 'necktie', 134000, 'Tie has two principal meanings: Tie (draw), a finish to a competition with identical results, particularly sports', 2, '2020-09-28 08:24:04', '2020-10-18 02:38:01');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_color`
--

CREATE TABLE `product_color` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_color` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_condition`
--

CREATE TABLE `product_condition` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `condition` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_image`
--

CREATE TABLE `product_image` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `url` varchar(225) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` text NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `create_at`, `update_at`) VALUES
(1, 'Super Admin', '', '2020-09-27 02:59:16', NULL),
(2, 'Seller', 'you can access seller features', '2020-09-27 03:00:19', NULL),
(3, 'Customer', 'you can access customer features', '2020-09-27 03:01:35', NULL),
(4, 'user', 'you can only access some pages', '2020-09-27 03:03:01', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `roles_id` int(11) NOT NULL,
  `user_name` varchar(25) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(70) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `roles_id`, `user_name`, `email`, `password`, `created_at`, `update_at`) VALUES
(1, 1, 'mat ngademin', 'admin@gmail.com', '$2a$10$Oj9n.AxXh7NJkxwZ5qA.Je9oi2dI/14GgNqNxYosBJ/1q9Dwt1xs.', '2020-09-29 15:54:20', NULL),
(2, 2, 'tukang adol', 'seller@gmail.com', '$2a$10$lGxWq0nvCrUeWfTTSxoxr.MLyZV6HbGnHrKABgzliRdkr87B5i2xi', '2020-09-29 15:55:08', '2020-09-29 15:55:33'),
(3, 3, 'derk junior', 'custommerHedon@gmail.com', '$2a$10$xzF0G.5s2FinerWbSp2CFO4B5D3wyArEdtuc7Vsv6WUfDaiEOOl.6', '2020-09-29 15:56:10', '2020-10-02 06:02:41'),
(8, 2, 'selena', 'sellerCantik@gmail.com', '$2a$10$o2suyVvMXi/vxdjyPGFNae6lhxXq.7zph3cyiNfF5FYniI2P3MXS6', '2020-10-01 15:38:36', NULL),
(14, 3, 'fatkhul', 'tumbasjejan@gmail.com', '$2a$10$uFhLW.LMua5TZ8.F/jUb2eJ2EFMnLcpyPWCtd/kX1QiOoddJSLTlC', '2020-10-17 12:23:29', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_detail`
--

CREATE TABLE `user_detail` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `phone` int(15) NOT NULL,
  `photo` varchar(225) NOT NULL,
  `gender` varchar(7) NOT NULL,
  `birth` varchar(20) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_detail`
--

INSERT INTO `user_detail` (`id`, `user_id`, `phone`, `photo`, `gender`, `birth`, `create_at`, `update_at`) VALUES
(1, 1, 2147483647, '/uploads/1601253278813.jpg', '', '', '2020-09-28 00:34:38', NULL),
(4, 2, 899789976, '/uploads/1601304741493.jpg', '', '', '2020-09-28 14:20:48', '2020-09-28 14:52:21'),
(6, 3, 2147483647, '/uploads/1601618561051.jpg', 'male', '23 november 2000', '2020-09-29 01:44:00', '2020-10-02 06:02:41');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items_id` (`items_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Indeks untuk tabel `product_color`
--
ALTER TABLE `product_color`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeks untuk tabel `product_condition`
--
ALTER TABLE `product_condition`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeks untuk tabel `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeks untuk tabel `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roles_id` (`roles_id`);

--
-- Indeks untuk tabel `user_detail`
--
ALTER TABLE `user_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT untuk tabel `product_color`
--
ALTER TABLE `product_color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `product_condition`
--
ALTER TABLE `product_condition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `user_detail`
--
ALTER TABLE `user_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product_color`
--
ALTER TABLE `product_color`
  ADD CONSTRAINT `product_color_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product_condition`
--
ALTER TABLE `product_condition`
  ADD CONSTRAINT `product_condition_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_detail`
--
ALTER TABLE `user_detail`
  ADD CONSTRAINT `user_detail_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
