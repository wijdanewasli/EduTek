<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20261117094233 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE annee_academique (id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(20) NOT NULL, date_debut DATE NOT NULL, date_fin DATE NOT NULL, courante TINYINT NOT NULL, UNIQUE INDEX UNIQ_A6971EA8A4D60759 (libelle), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE classe (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(20) NOT NULL, nom VARCHAR(100) NOT NULL, niveau INT NOT NULL, filiere_id INT NOT NULL, annee_academique_id INT NOT NULL, UNIQUE INDEX UNIQ_8F87BF9677153098 (code), INDEX IDX_8F87BF96180AA129 (filiere_id), INDEX IDX_8F87BF96B00F076 (annee_academique_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE filiere (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(20) NOT NULL, intitule VARCHAR(150) NOT NULL, description LONGTEXT DEFAULT NULL, UNIQUE INDEX UNIQ_2ED05D9E77153098 (code), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE classe ADD CONSTRAINT FK_8F87BF96180AA129 FOREIGN KEY (filiere_id) REFERENCES filiere (id)');
        $this->addSql('ALTER TABLE classe ADD CONSTRAINT FK_8F87BF96B00F076 FOREIGN KEY (annee_academique_id) REFERENCES annee_academique (id)');
        $this->addSql('ALTER TABLE etudiant ADD classe_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE etudiant ADD CONSTRAINT FK_717E22E38F5EA509 FOREIGN KEY (classe_id) REFERENCES classe (id) ON DELETE SET NULL');
        $this->addSql('CREATE INDEX IDX_717E22E38F5EA509 ON etudiant (classe_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE classe DROP FOREIGN KEY FK_8F87BF96180AA129');
        $this->addSql('ALTER TABLE classe DROP FOREIGN KEY FK_8F87BF96B00F076');
        $this->addSql('DROP TABLE annee_academique');
        $this->addSql('DROP TABLE classe');
        $this->addSql('DROP TABLE filiere');
        $this->addSql('ALTER TABLE etudiant DROP FOREIGN KEY FK_717E22E38F5EA509');
        $this->addSql('DROP INDEX IDX_717E22E38F5EA509 ON etudiant');
        $this->addSql('ALTER TABLE etudiant DROP classe_id');
    }
}
