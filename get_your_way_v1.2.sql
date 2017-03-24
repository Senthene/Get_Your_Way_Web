-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Mer 22 Mars 2017 à 21:04
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
-- Structure de la table `j01_list_user`
--

CREATE TABLE `j01_list_user` (
  `J01_ID_USER` int(11) NOT NULL,
  `J01_PROFIL` varchar(50) NOT NULL,
  `J01_EMAIL` varchar(200) NOT NULL,
  `J01_PASSWORD` varchar(20) NOT NULL,
  `J01_NOM` varchar(200) NOT NULL,
  `J01_PRENOM` varchar(200) NOT NULL,
  `J01_DC` varchar(10) NOT NULL,
  `J01_DM` varchar(10) DEFAULT NULL,
  `J01_ID_DM` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `j02_log`
--

CREATE TABLE `j02_log` (
  `J02_ID_LOG` int(11) NOT NULL,
  `J02_EMAIL` varchar(200) NOT NULL,
  `J02_PASSWORD` varchar(250) NOT NULL COMMENT 'Mot de passe utilisé',
  `J02_TIME` timestamp NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `j03_list_carte`
--

CREATE TABLE `j03_list_carte` (
  `J03_ID_CARTE` int(11) NOT NULL,
  `J03_PLACE_ID` varchar(255) NOT NULL,
  `J01_LATITUDE` float NOT NULL,
  `J01_LONGITUDE` float NOT NULL,
  `J03_NOM` varchar(100) NOT NULL,
  `J03_ADRESSE` varchar(200) NOT NULL,
  `J03_CP` int(11) NOT NULL COMMENT 'code postale',
  `J03_DC` varchar(10) NOT NULL COMMENT 'Date de création',
  `J03_ID_UC` int(11) NOT NULL COMMENT 'Id user de création',
  `J03_DM` varchar(10) DEFAULT NULL COMMENT 'Date de modification',
  `J03_ID_DM` int(11) DEFAULT NULL COMMENT 'Id de modification'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `j04_bloc`
--

CREATE TABLE `j04_bloc` (
  `J04_ID_BLOC` int(11) NOT NULL,
  `J04_ID_ETAGE` int(11) NOT NULL,
  `J04_TYPE` int(11) NOT NULL,
  `J04_NOM` int(11) DEFAULT NULL,
  `J04_DC` varchar(10) NOT NULL,
  `J04_ID_DC` int(11) NOT NULL,
  `J04_DM` varchar(10) DEFAULT NULL,
  `J04_ID_DM` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `j05_ligne`
--

CREATE TABLE `j05_ligne` (
  `J05_ID_LINE` int(11) NOT NULL,
  `J05_ID_BLOC` int(11) NOT NULL,
  `J05_Depart_X` int(11) NOT NULL,
  `J05_Depart_Y` int(11) NOT NULL,
  `J05_Depart_Z` int(11) NOT NULL,
  `J05_Fin_X` int(11) NOT NULL,
  `J05_Fin_Y` int(11) NOT NULL,
  `J05_Fin_Z` int(11) NOT NULL,
  `J05_Longueur` int(11) NOT NULL,
  `J05_Angle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `j06_etage`
--

CREATE TABLE `j06_etage` (
  `J06_ID_ETAGE` int(11) NOT NULL,
  `J06_ID_CARTE` int(11) NOT NULL,
  `J06_NUMERO_ETAGE` int(11) NOT NULL,
  `J06_DC` varchar(10) NOT NULL COMMENT 'Date de création',
  `J06_ID_DC` int(11) NOT NULL COMMENT 'ID de création',
  `J06_DM` varchar(11) DEFAULT NULL COMMENT 'Date de modification',
  `J06_ID_DM` int(11) DEFAULT NULL COMMENT 'ID de  modification'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `j07_liaison`
--

CREATE TABLE `j07_liaison` (
  `J07_ID_LIAISON` int(11) NOT NULL,
  `J07_ID_ETAGE_CURRENT` int(11) NOT NULL,
  `J07_NUMERO_ETAGE_CURRENT` int(11) NOT NULL,
  `J07_ID_ETAGE` int(11) NOT NULL,
  `J07_NUMERO_ETAGE` int(11) NOT NULL,
  `J07_POSITION_X` double NOT NULL,
  `J07_POSITION_Y` double NOT NULL,
  `J07_TYPE` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `j08_repere`
--

CREATE TABLE `j08_repere` (
  `J08_ID_REPERE` int(11) NOT NULL,
  `J08_ID_BLOC` int(11) NOT NULL,
  `J08_TYPE` varchar(200) NOT NULL,
  `J08_POSITION_X` float NOT NULL,
  `J08_POSITION_Y` float NOT NULL,
  `J08_DC` varchar(10) NOT NULL,
  `J08_ID_DC` int(11) NOT NULL,
  `J08_DM` varchar(10) DEFAULT NULL,
  `J08_ID_DM` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `j01_list_user`
--
ALTER TABLE `j01_list_user`
  ADD PRIMARY KEY (`J01_ID_USER`),
  ADD UNIQUE KEY `J01_EMAIL` (`J01_EMAIL`);

--
-- Index pour la table `j02_log`
--
ALTER TABLE `j02_log`
  ADD PRIMARY KEY (`J02_ID_LOG`);

--
-- Index pour la table `j03_list_carte`
--
ALTER TABLE `j03_list_carte`
  ADD PRIMARY KEY (`J03_ID_CARTE`),
  ADD UNIQUE KEY `place_id` (`J03_PLACE_ID`),
  ADD KEY `J03_ID_UC` (`J03_ID_UC`);

--
-- Index pour la table `j04_bloc`
--
ALTER TABLE `j04_bloc`
  ADD PRIMARY KEY (`J04_ID_BLOC`),
  ADD UNIQUE KEY `J04_Carte` (`J04_ID_ETAGE`);

--
-- Index pour la table `j05_ligne`
--
ALTER TABLE `j05_ligne`
  ADD PRIMARY KEY (`J05_ID_LINE`),
  ADD KEY `J05_ID_BLOC` (`J05_ID_BLOC`);

--
-- Index pour la table `j06_etage`
--
ALTER TABLE `j06_etage`
  ADD PRIMARY KEY (`J06_ID_ETAGE`),
  ADD KEY `J06_ID_CARTE` (`J06_ID_CARTE`);

--
-- Index pour la table `j07_liaison`
--
ALTER TABLE `j07_liaison`
  ADD PRIMARY KEY (`J07_ID_LIAISON`),
  ADD KEY `J07_ID_ETAGE_CURRENT` (`J07_ID_ETAGE_CURRENT`),
  ADD KEY `J07_ID_ETAGE` (`J07_ID_ETAGE`);

--
-- Index pour la table `j08_repere`
--
ALTER TABLE `j08_repere`
  ADD PRIMARY KEY (`J08_ID_REPERE`),
  ADD KEY `J08_ID_BLOC` (`J08_ID_BLOC`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `j01_list_user`
--
ALTER TABLE `j01_list_user`
  MODIFY `J01_ID_USER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `j02_log`
--
ALTER TABLE `j02_log`
  MODIFY `J02_ID_LOG` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `j03_list_carte`
--
ALTER TABLE `j03_list_carte`
  MODIFY `J03_ID_CARTE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT pour la table `j04_bloc`
--
ALTER TABLE `j04_bloc`
  MODIFY `J04_ID_BLOC` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `j05_ligne`
--
ALTER TABLE `j05_ligne`
  MODIFY `J05_ID_LINE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT pour la table `j06_etage`
--
ALTER TABLE `j06_etage`
  MODIFY `J06_ID_ETAGE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `j07_liaison`
--
ALTER TABLE `j07_liaison`
  MODIFY `J07_ID_LIAISON` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `j08_repere`
--
ALTER TABLE `j08_repere`
  MODIFY `J08_ID_REPERE` int(11) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `j01_list_user`
--
ALTER TABLE `j01_list_user`
  ADD CONSTRAINT `PK_USER_CARTE` FOREIGN KEY (`J01_ID_USER`) REFERENCES `j03_list_carte` (`J03_ID_UC`) ON DELETE CASCADE;

--
-- Contraintes pour la table `j03_list_carte`
--
ALTER TABLE `j03_list_carte`
  ADD CONSTRAINT `PK_CARTE_ETAGE` FOREIGN KEY (`J03_ID_CARTE`) REFERENCES `j06_etage` (`J06_ID_CARTE`) ON DELETE CASCADE;

--
-- Contraintes pour la table `j04_bloc`
--
ALTER TABLE `j04_bloc`
  ADD CONSTRAINT `PK_BLOC_LINE` FOREIGN KEY (`J04_ID_BLOC`) REFERENCES `j05_ligne` (`J05_ID_BLOC`),
  ADD CONSTRAINT `PK_BOC_REPERE` FOREIGN KEY (`J04_ID_BLOC`) REFERENCES `j08_repere` (`J08_ID_BLOC`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `j06_etage`
--
ALTER TABLE `j06_etage`
  ADD CONSTRAINT `PK_ETAGE_BLOC` FOREIGN KEY (`J06_ID_ETAGE`) REFERENCES `j04_bloc` (`J04_ID_ETAGE`) ON DELETE CASCADE,
  ADD CONSTRAINT `PK_ETAGE_LIAISON` FOREIGN KEY (`J06_ID_ETAGE`) REFERENCES `j07_liaison` (`J07_ID_ETAGE`) ON DELETE CASCADE,
  ADD CONSTRAINT `PK_ETAGE_LIAISON_CURRENT` FOREIGN KEY (`J06_ID_ETAGE`) REFERENCES `j07_liaison` (`J07_ID_ETAGE_CURRENT`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
