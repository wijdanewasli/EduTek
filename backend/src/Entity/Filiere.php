<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'filiere')]
class Filiere
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 20, unique: true), Assert\NotBlank]
    private string $code = '';

    #[ORM\Column(length: 150), Assert\NotBlank]
    private string $intitule = '';

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $description = null;

    /** @var Collection<int, Classe> */
    #[ORM\OneToMany(targetEntity: Classe::class, mappedBy: 'filiere')]
    private Collection $classes;

    public function __construct()
    {
        $this->classes = new ArrayCollection();
    }

    public function ajouterClasse(Classe $classe): static
    {
        if (!$this->classes->contains($classe)) {
            $this->classes->add($classe);
            $classe->setFiliere($this);
        }
        return $this;
    }

    public function getId(): ?int { return $this->id; }
    public function getCode(): string { return $this->code; }
    public function setCode(string $code): static { $this->code = $code; return $this; }
    public function getIntitule(): string { return $this->intitule; }
    public function setIntitule(string $intitule): static { $this->intitule = $intitule; return $this; }
    public function getDescription(): ?string { return $this->description; }
    public function setDescription(?string $description): static { $this->description = $description; return $this; }

    /** @return Collection<int, Classe> */
    public function getClasses(): Collection { return $this->classes; }
}
