<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'annee_academique')]
class AnneeAcademique
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 20, unique: true), Assert\NotBlank]
    private string $libelle = '';

    #[ORM\Column(type: 'date_immutable')]
    private \DateTimeImmutable $dateDebut;

    #[ORM\Column(type: 'date_immutable')]
    private \DateTimeImmutable $dateFin;

    #[ORM\Column]
    private bool $courante = false;

    public function __construct()
    {
        $this->dateDebut = new \DateTimeImmutable();
        $this->dateFin = new \DateTimeImmutable('+1 year');
    }

    public function activer(): void { $this->courante = true; }
    public function cloturer(): void { $this->courante = false; }

    public function getId(): ?int { return $this->id; }
    public function getLibelle(): string { return $this->libelle; }
    public function setLibelle(string $libelle): static { $this->libelle = $libelle; return $this; }
    public function getDateDebut(): \DateTimeImmutable { return $this->dateDebut; }
    public function setDateDebut(\DateTimeImmutable $d): static { $this->dateDebut = $d; return $this; }
    public function getDateFin(): \DateTimeImmutable { return $this->dateFin; }
    public function setDateFin(\DateTimeImmutable $d): static { $this->dateFin = $d; return $this; }
    public function isCourante(): bool { return $this->courante; }
}
