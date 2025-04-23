-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2025 at 12:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carbookingsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `startTime` varchar(5) NOT NULL,
  `endTime` varchar(5) NOT NULL,
  `purpose` varchar(500) NOT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'รออนุมัติ',
  `startMileage` int(11) DEFAULT NULL,
  `endMileage` int(11) DEFAULT NULL,
  `mileageDiff` int(11) DEFAULT NULL,
  `fuelLevel` varchar(20) DEFAULT NULL,
  `fuelCost` decimal(10,2) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `approvedAt` timestamp NULL DEFAULT NULL,
  `approvedBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `typeId` int(11) DEFAULT NULL,
  `licensePlate` varchar(20) NOT NULL,
  `status` varchar(20) DEFAULT 'ว่าง',
  `initialMileage` int(11) DEFAULT 0,
  `currentMileage` int(11) DEFAULT 0,
  `lastService` date DEFAULT NULL,
  `nextService` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `fileName` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `name`, `type`, `typeId`, `licensePlate`, `status`, `initialMileage`, `currentMileage`, `lastService`, `nextService`, `image`, `fileName`, `createdAt`) VALUES
(4, 'Honda City', 'รถเก๋ง', 1, 'บฉ5678', 'ว่าง', 12345, 10400, NULL, NULL, '', '', '2025-03-27 07:16:19'),
(5, 'Toyota Yaris ATIV ', 'รถเก๋ง', 1, 'กฉ4756', 'ว่าง', 12345, 10500, NULL, NULL, '', '', '2025-03-27 07:16:39'),
(6, 'ISUZU D-MAX', 'รถกระบะ', 4, 'กฉ4532', 'ว่าง', 12345, 10300, NULL, NULL, '', '', '2025-03-27 07:19:28'),
(7, 'Toyota Yaris ATIV', 'รถเก๋ง', 1, 'บฉ56782', 'ว่าง', 12345, 10300, NULL, NULL, '', '', '2025-03-27 07:19:52');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'ผู้ใช้งาน',
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `employeeId` varchar(20) DEFAULT NULL,
  `licenseNumber` varchar(50) DEFAULT NULL,
  `licenseExpiry` date DEFAULT NULL,
  `joinDate` date DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `department`, `role`, `password`, `phone`, `employeeId`, `licenseNumber`, `licenseExpiry`, `joinDate`, `avatar`, `createdAt`) VALUES
(1, 'ผู้ดูแลระบบ', 'admin@nozomi.com', 'ฝ่ายไอที', 'ผู้ดูแลระบบ', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', NULL, 'NZT-ADMIN', NULL, NULL, NULL, NULL, '2025-03-27 06:42:06'),
(7, 'อธิจิต หงส์กิตติกุล', 'gglike21@gmail.com', 'IT', 'ผู้ใช้งาน', 'cfe211ea86fc7aa6be1678ffa959800769325ec7d43dd1a183a6462dcc53b58d', '0989303139', 'HR0236', NULL, NULL, NULL, '/uploads/avatars/avatar-bb6e8815-2dda-41c4-8881-7d468d1800d9.jpeg', '2025-03-31 02:29:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_bookings_dates` (`startDate`,`endDate`),
  ADD KEY `idx_bookings_status` (`status`),
  ADD KEY `idx_bookings_user` (`userId`),
  ADD KEY `idx_bookings_car` (`carId`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `licensePlate` (`licensePlate`),
  ADD KEY `idx_cars_status` (`status`),
  ADD KEY `fk_car_type` (`typeId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `fk_car_type` FOREIGN KEY (`typeId`) REFERENCES `cartypes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
