<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'enseignant')]
class Enseignant extends Utilisateur
{
    #[ORM\Column(length: 30, unique: true)]
    private string $matricule = '';

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $specialite = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $grade = null;

    public function getRoles(): array { return ['ROLE_ENSEIGNANT', 'ROLE_USER']; }

    public function getMatricule(): string { return $this->matricule; }
    public function setMatricule(string $m): static { $this->matricule = $m; return $this; }
    public function getSpecialite(): ?string { return $this->specialite; }
    public function setSpecialite(?string $s): static { $this->specialite = $s; return $this; }
    public function getGrade(): ?string { return $this->grade; }
    public function setGrade(?string $g): static { $this->grade = $g; return $this; }
}
