<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'etudiant')]
class Etudiant extends Utilisateur
{
    #[ORM\Column(length: 30, unique: true)]
    private string $numeroInscription = '';

    #[ORM\Column(type: 'date_immutable', nullable: true)]
    private ?\DateTimeImmutable $dateNaissance = null;

    public function getRoles(): array { return ['ROLE_ETUDIANT', 'ROLE_USER']; }

    public function getNumeroInscription(): string { return $this->numeroInscription; }
    public function setNumeroInscription(string $n): static { $this->numeroInscription = $n; return $this; }
    public function getDateNaissance(): ?\DateTimeImmutable { return $this->dateNaissance; }
    public function setDateNaissance(?\DateTimeImmutable $d): static { $this->dateNaissance = $d; return $this; }
}
