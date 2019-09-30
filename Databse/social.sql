-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2019 at 11:14 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(255) NOT NULL,
  `comment_content` varchar(5000) NOT NULL,
  `user_comment_name` varchar(255) NOT NULL,
  `post_id` int(255) NOT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_content`, `user_comment_name`, `post_id`, `date`) VALUES
(29, 'naaice <3', 'hwkeye123', 1, '2019-09-12 11:17:41.292935'),
(30, 'Excellent', 'hwkeye123', 1, '2019-09-12 14:00:06.146431'),
(31, 'Someone please comment', 'hwkeye123', 4, '2019-09-12 14:03:38.540528'),
(32, 'Awesome', 'hwkeye123', 1, '2019-09-12 16:36:18.380825'),
(33, 'Awesome', 'hwkeye123', 1, '2019-09-12 16:36:23.692618'),
(34, 'Maichi', 'hwkeye123', 1, '2019-09-13 14:14:17.262258'),
(35, 'Past is a place to visit for memories not motivation', 'raakhi514', 28, '2019-09-15 12:35:24.615057'),
(36, 'lol', 'raakhi514', 4, '2019-09-15 16:37:45.622541'),
(37, 'naice', 'raakhi514', 27, '2019-09-15 16:37:53.717457'),
(38, 'gmfromaniket', 'hwkeye123', 1, '2019-09-19 10:00:03.492942'),
(39, 'yo', 'hwkeye123', 1, '2019-09-23 16:31:20.681755'),
(62, 'lol', 'hwkeye123', 1, '2019-09-28 17:21:42.231125'),
(63, 'yesss', 'hwkeye123', 1, '2019-09-30 05:37:27.026446'),
(64, 'Well Said Dear', 'GrimReaper', 1, '2019-09-30 06:20:26.473053'),
(65, 'I also like choclates', 'GrimReaper', 27, '2019-09-30 06:20:42.951927'),
(66, 'Yess', 'GrimReaper', 28, '2019-09-30 06:21:01.329893');

-- --------------------------------------------------------

--
-- Table structure for table `notification_comments`
--

CREATE TABLE `notification_comments` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `comment_id` int(255) NOT NULL,
  `date` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification_comments`
--

INSERT INTO `notification_comments` (`id`, `user_id`, `comment_id`, `date`) VALUES
(21, 13, 64, '2019-09-30 06:20:26.497641'),
(22, 13, 65, '2019-09-30 06:20:42.980849'),
(23, 13, 66, '2019-09-30 06:21:01.366759');

-- --------------------------------------------------------

--
-- Table structure for table `notification_votes`
--

CREATE TABLE `notification_votes` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `vote_id` int(255) NOT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification_votes`
--

INSERT INTO `notification_votes` (`id`, `user_id`, `vote_id`, `date`) VALUES
(5, 13, 55, '2019-09-30 06:20:17.084716'),
(6, 13, 56, '2019-09-30 06:20:33.836200'),
(7, 13, 57, '2019-09-30 06:20:51.857121');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(255) NOT NULL,
  `post_title` varchar(255) NOT NULL,
  `post_content` varchar(8000) NOT NULL,
  `post_user` varchar(255) NOT NULL,
  `post_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_title`, `post_content`, `post_user`, `post_date`) VALUES
(1, 'The Last Bus', 'That was the last bus one could catch to Vicenza. She kept everything she knew would come handy, and she had nothing but a watch, an old one aesthetic though, that he left on the table, mistakenly (maybe) the last time they were together. A bouquet of his favourite lilies and the dark chocolate he loved. It was going to be a long weekend. Realising the fact that she didn’t really skip her work for past few months. Afterall that was the one thing that could keep her mind off and distracted. She stared at the watch, remembering the very time when he wore it for the first time. The smile on his face, was all she would’ve ever wanted to see. She shook herself back to present, and got into the bus. She stared outside at the stars following her, as if stopping her from something bad. The voices of the busy city, were fading slowly. Light traffic noises were all that was audible after a little while. The night was windy, she let her long hair fall open. Felt so much lighter. The wind would interwind and meet every strand, as if it experienced what it’s absence feels like and didn’t want to let it go. Ever. Laura didn’t let the smile, that she would have had when she meets him, be discouraged in any way. She would cheer herself up every few minutes just to make sure, her fear didn’t surface. Sleep wasn’t there to be seen for a minute, and it was dawn already. The sun kissed pieces of art scattered everywhere were called buildings here in Vicenza. Yes people lived in them. I had no address, though I knew someone who would. And my sleepless eyes and pounding heart kept waiting for one thing to be seen, to be felt. There is something more than just visual aesthetics that one feels about this city. You’ll find peace in it’s silence. I found anxiety. With every passing minute. Nothing led me closer to where I wanted to be. The flowers were drying and so was I. This was the place they fixed. The date too. Where was he. Nowhere to be seen. Breaking a piece of dark chocolate she carried, lost almost all of the hope. Sobbing she walked in those beautiful empty avenues, when she saw a couple of people dressed in black. Little interrogation got her the name and she broke and fell down into a dark dirty pit where she could hear her name being screamed and that was when she gasped heavily and woke alive. Her maid had never behaved herself while waking her up. She jumped out of her bed stormed into every single room shouting “Joe-Joe where are you?” She could hold no more when she saw the old watch left on the table. A last cry of his name and he hugged her from behind. “I’m sure not leaving a single chance of annoying you, am I? Cm’on mom’s calling.”', 'raakhi514', '2019-09-30'),
(4, 'I ate a pizza', 'Welli also ate a pizza today', 'hwkeye123', '2019-09-26'),
(27, 'i ate a choclate again', 'a dairy milk', 'hwkeye123', '2019-09-30'),
(28, 'A Cry', 'How much do you weigh? Do you weigh exactly how much you wanted to? We’re all struggling our ways out into at least moving in that direction, aren’t we? You see how hard do we struggle to release this heaviness that we carry physically, and strangely how rare do we think of releasing the heaviness that we all carry and are adding up to everyday deep within subconsciously ? Not that the former is of any less importance but isn’t the latter too equally?I’ve often seen people controlling the negative emotions inside of them, or if they can at an early stage, they tend to ignore it, forgetting they’re just putting it on a hold to be released at some other instance multi folds. While there is this other category of people who are more likely to ‘not have a control over their emotions’ as they say, and yeah, cry. To be clear I’m not talking about acting upon the emotions in ways that harm others. But what if you could really use these ways to get things, that have been there inside you for long enough now, out and get rid of ‘em. But the problem here is, some people have a control over ‘how and when ‘ of this emotional outburst, while some others still struggling with this epiglottis of emotional control. Why do we even need a lash over this release of pain? That is something everyone requires and maybe even does, then why hide or conceal it? I ponder more over it, because yeah I suck at it. What I saw generally observing people was the fear of being judged. I think this one fear does a lot of damage to us in more than one without us even realizing about it. Fear of being judged is something that falls just below the fear of death. Toughest of the man, thinks thrice before letting himself lose, because he has an image and that he would be judged for not being as that faux image of his, even at his hard times. What we need to question here is that, how do we prioritise at such times about what matters more? Is that fabricated image more important than your peace of mind? Is that so? Why carry these worthless heavy scraps tied around you all the time? These emotions that we do not release, they grow as long as we keep them inside and nurture. And believe me, they’re heavy. All the guilt, anger, regret, envy and god knows what not. These mighty shoulders of ours, that we have shed sweat upon for, are meant to carry so much more worthy and meaningful than these good for nothing liabilities that we are creating for ourselves and carrying them all along our journey that just keep reminding us of our past.', 'raakhi514', '2019-09-30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `uname` varchar(255) NOT NULL,
  `upass` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `sname` varchar(255) NOT NULL,
  `createdon` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uname`, `upass`, `name`, `dob`, `country`, `sname`, `createdon`) VALUES
(8, 'KshitijG@g.co', '1234', 'Kshitij Gomkar', '1997-03-27', 'India', 'kshitij23', '2019-09-03 15:33:11'),
(10, 'deeprajchouhan761@gmail.com', 'vzio1234', 'Deepraj Chouhan', '1998-03-27', 'India', 'hwkeye123', '2019-09-04 21:07:20'),
(11, 'rakhishukla@gmail.com', 'password', 'Raakhi Shukla', '21/04/1998', 'India', 'raakhi@514', '2019-09-12 16:46:41'),
(13, 'vivek320thakre@gmail.com', 'password', 'Vivek Thakre', '1997-01-27', 'India', 'GrimReaper', '2019-09-30 11:49:27');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `post_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `user_id`, `post_id`) VALUES
(30, 11, 4),
(44, 11, 28),
(51, 10, 1),
(52, 11, 1),
(53, 10, 27),
(54, 10, 28),
(55, 13, 1),
(56, 13, 27),
(57, 13, 28);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `notification_comments`
--
ALTER TABLE `notification_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `comment_id` (`comment_id`);

--
-- Indexes for table `notification_votes`
--
ALTER TABLE `notification_votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vote_id` (`vote_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `notification_comments`
--
ALTER TABLE `notification_comments`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `notification_votes`
--
ALTER TABLE `notification_votes`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Constraints for table `notification_comments`
--
ALTER TABLE `notification_comments`
  ADD CONSTRAINT `notification_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notification_comments_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`);

--
-- Constraints for table `notification_votes`
--
ALTER TABLE `notification_votes`
  ADD CONSTRAINT `notification_votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notification_votes_ibfk_2` FOREIGN KEY (`vote_id`) REFERENCES `votes` (`id`);

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
