<?php

namespace App\Entity;

use App\Repository\UtilisateurRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UtilisateurRepository::class)]
#[ORM\Table(name: 'utilisateur')]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name: 'type', type: 'string', length: 20)]
#[ORM\DiscriminatorMap([
    'etudiant' => Etudiant::class,
    'enseignant' => Enseignant::class,
    'admin' => Administrateur::class,
])]
#[UniqueEntity('email')]
abstract class Utilisateur implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    protected ?int $id = null;

    #[ORM\Column(length: 100), Assert\NotBlank]
    protected string $nom = '';

    #[ORM\Column(length: 100), Assert\NotBlank]
    protected string $prenom = '';

    #[ORM\Column(length: 180, unique: true), Assert\Email]
    protected string $email = '';

    #[ORM\Column]
    protected string $password = '';

    #[ORM\Column(length: 20, nullable: true)]
    protected ?string $telephone = null;

    #[ORM\Column]
    protected \DateTimeImmutable $dateCreation;

    #[ORM\Column]
    protected bool $actif = true;

    public function __construct()
    {
        $this->dateCreation = new \DateTimeImmutable();
    }

    abstract public function getRoles(): array;

    public function getId(): ?int { return $this->id; }
    public function getNom(): string { return $this->nom; }
    public function setNom(string $nom): static { $this->nom = $nom; return $this; }
    public function getPrenom(): string { return $this->prenom; }
    public function setPrenom(string $prenom): static { $this->prenom = $prenom; return $this; }
    public function getEmail(): string { return $this->email; }
    public function setEmail(string $email): static { $this->email = $email; return $this; }
    public function getPassword(): string { return $this->password; }
    public function setPassword(string $hash): static { $this->password = $hash; return $this; }
    public function getTelephone(): ?string { return $this->telephone; }
    public function setTelephone(?string $t): static { $this->telephone = $t; return $this; }
    public function getDateCreation(): \DateTimeImmutable { return $this->dateCreation; }
    public function isActif(): bool { return $this->actif; }
    public function setActif(bool $actif): static { $this->actif = $actif; return $this; }

    public function getUserIdentifier(): string { return $this->email; }
    public function eraseCredentials(): void {}
}
