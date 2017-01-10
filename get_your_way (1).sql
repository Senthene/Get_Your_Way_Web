-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Lun 09 Janvier 2017 à 23:56
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `get_your_way`
--

-- --------------------------------------------------------

--
-- Structure de la table `j01_user`
--

CREATE TABLE `j01_user` (
  `J01_Email` varchar(200) NOT NULL,
  `J01_Nom` int(11) NOT NULL,
  `J01_Prenom` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `j03_carte`
--

CREATE TABLE `j03_carte` (
  `J03_IdCarte` int(11) NOT NULL,
  `J03_Nom` varchar(200) NOT NULL,
  `J03_Adresse` varchar(200) NOT NULL,
  `J03_CP` int(11) NOT NULL,
  `J03_Email` varchar(200) NOT NULL,
  `J03_Etage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `j03_carte`
--

INSERT INTO `j03_carte` (`J03_IdCarte`, `J03_Nom`, `J03_Adresse`, `J03_CP`, `J03_Email`, `J03_Etage`) VALUES
(28, 'Fac', '121 boulevard de France', 9100, 'benkaddour.abdelkarim@gmail.com', 0);

-- --------------------------------------------------------

--
-- Structure de la table `j04_bloc`
--

CREATE TABLE `j04_bloc` (
  `J04_IdBloc` int(11) NOT NULL,
  `J04_Type` int(11) NOT NULL,
  `J04_Nom` int(11) NOT NULL,
  `J04_IdCarte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `j05_ligne`
--

CREATE TABLE `j05_ligne` (
  `J05_IdLine` int(11) NOT NULL,
  `J05_IdCarte` int(11) NOT NULL,
  `J05_Depart_X` int(11) NOT NULL,
  `J05_Depart_Y` int(11) NOT NULL,
  `J05_Depart_Z` int(11) NOT NULL,
  `J05_Fin_X` int(11) NOT NULL,
  `J05_Fin_Y` int(11) NOT NULL,
  `J05_Fin_Z` int(11) NOT NULL,
  `J05_Longueur` int(11) NOT NULL,
  `J05_Angle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `j05_ligne`
--

INSERT INTO `j05_ligne` (`J05_IdLine`, `J05_IdCarte`, `J05_Depart_X`, `J05_Depart_Y`, `J05_Depart_Z`, `J05_Fin_X`, `J05_Fin_Y`, `J05_Fin_Z`, `J05_Longueur`, `J05_Angle`) VALUES
(41, 28, 0, 0, 0, 0, 0, 0, 0, 0),
(42, 28, 2950, 1724, 0, 2950, 1780, 0, 0, 90),
(43, 28, 2885, 1780, 0, 2885, 1724, 0, 0, 90),
(44, 28, 2950, 1780, 0, 2885, 1780, 0, 0, 180);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `j01_user`
--
ALTER TABLE `j01_user`
  ADD PRIMARY KEY (`J01_Email`);

--
-- Index pour la table `j03_carte`
--
ALTER TABLE `j03_carte`
  ADD PRIMARY KEY (`J03_IdCarte`);

--
-- Index pour la table `j04_bloc`
--
ALTER TABLE `j04_bloc`
  ADD PRIMARY KEY (`J04_IdBloc`),
  ADD UNIQUE KEY `J04_Carte` (`J04_IdCarte`);

--
-- Index pour la table `j05_ligne`
--
ALTER TABLE `j05_ligne`
  ADD PRIMARY KEY (`J05_IdLine`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `j03_carte`
--
ALTER TABLE `j03_carte`
  MODIFY `J03_IdCarte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT pour la table `j04_bloc`
--
ALTER TABLE `j04_bloc`
  MODIFY `J04_IdBloc` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `j05_ligne`
--
ALTER TABLE `j05_ligne`
  MODIFY `J05_IdLine` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
