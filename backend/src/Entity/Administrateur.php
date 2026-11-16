<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'administrateur')]
class Administrateur extends Utilisateur
{
    #[ORM\Column(length: 50)]
    private string $niveauAcces = 'STANDARD';

    public function getRoles(): array { return ['ROLE_ADMIN', 'ROLE_USER']; }

    public function getNiveauAcces(): string { return $this->niveauAcces; }
    public function setNiveauAcces(string $n): static { $this->niveauAcces = $n; return $this; }
}
