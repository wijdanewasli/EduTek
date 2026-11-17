<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'classe')]
class Classe
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 20, unique: true), Assert\NotBlank]
    private string $code = '';

    #[ORM\Column(length: 100), Assert\NotBlank]
    private string $nom = '';

    #[ORM\Column]
    private int $niveau = 1;

    #[ORM\ManyToOne(targetEntity: Filiere::class, inversedBy: 'classes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Filiere $filiere = null;

    #[ORM\ManyToOne(targetEntity: AnneeAcademique::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?AnneeAcademique $anneeAcademique = null;

    /** @var Collection<int, Etudiant> */
    #[ORM\OneToMany(targetEntity: Etudiant::class, mappedBy: 'classe')]
    private Collection $etudiants;

    public function __construct()
    {
        $this->etudiants = new ArrayCollection();
    }

    public function ajouterEtudiant(Etudiant $etudiant): static
    {
        if (!$this->etudiants->contains($etudiant)) {
            $this->etudiants->add($etudiant);
            $etudiant->setClasse($this);
        }
        return $this;
    }

    public function retirerEtudiant(Etudiant $etudiant): static
    {
        if ($this->etudiants->removeElement($etudiant) && $etudiant->getClasse() === $this) {
            $etudiant->setClasse(null);
        }
        return $this;
    }

    /** Effectif calcule a partir des etudiants (pas de colonne en base) */
    public function getEffectif(): int { return $this->etudiants->count(); }

    public function getId(): ?int { return $this->id; }
    public function getCode(): string { return $this->code; }
    public function setCode(string $code): static { $this->code = $code; return $this; }
    public function getNom(): string { return $this->nom; }
    public function setNom(string $nom): static { $this->nom = $nom; return $this; }
    public function getNiveau(): int { return $this->niveau; }
    public function setNiveau(int $niveau): static { $this->niveau = $niveau; return $this; }
    public function getFiliere(): ?Filiere { return $this->filiere; }
    public function setFiliere(?Filiere $filiere): static { $this->filiere = $filiere; return $this; }
    public function getAnneeAcademique(): ?AnneeAcademique { return $this->anneeAcademique; }
    public function setAnneeAcademique(?AnneeAcademique $a): static { $this->anneeAcademique = $a; return $this; }

    /** @return Collection<int, Etudiant> */
    public function getEtudiants(): Collection { return $this->etudiants; }
}
