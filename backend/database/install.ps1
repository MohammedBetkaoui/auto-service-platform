# ============================================================
# Script PowerShell - Installation de la Base de Données
# Plateforme Auto-Service
# ============================================================

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Installation Base de Données Auto-Service" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si MySQL est installé
$mysqlPath = Get-Command mysql -ErrorAction SilentlyContinue

if (-not $mysqlPath) {
    Write-Host "❌ ERREUR: MySQL n'est pas installé ou pas dans le PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Solutions:" -ForegroundColor Yellow
    Write-Host "1. Installer MySQL: https://dev.mysql.com/downloads/mysql/" -ForegroundColor Yellow
    Write-Host "2. Ou installer XAMPP: https://www.apachefriends.org/" -ForegroundColor Yellow
    Write-Host "3. Ajouter MySQL au PATH système" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ MySQL détecté: $($mysqlPath.Source)" -ForegroundColor Green
Write-Host ""

# Demander les identifiants MySQL
$mysqlUser = Read-Host "Nom d'utilisateur MySQL (défaut: root)"
if ([string]::IsNullOrWhiteSpace($mysqlUser)) {
    $mysqlUser = "root"
}

$mysqlPassword = Read-Host "Mot de passe MySQL (Entrée pour aucun)" -AsSecureString
$mysqlPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($mysqlPassword)
)

Write-Host ""
Write-Host "🔄 Connexion à MySQL..." -ForegroundColor Yellow

# Tester la connexion
$testConnection = if ([string]::IsNullOrWhiteSpace($mysqlPasswordPlain)) {
    & mysql -u $mysqlUser -e "SELECT 1;" 2>&1
} else {
    & mysql -u $mysqlUser -p"$mysqlPasswordPlain" -e "SELECT 1;" 2>&1
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERREUR: Impossible de se connecter à MySQL" -ForegroundColor Red
    Write-Host "Vérifiez vos identifiants et réessayez." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Connexion réussie à MySQL" -ForegroundColor Green
Write-Host ""

# Chemins des fichiers
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$createDbScript = Join-Path $scriptDir "migrations\create_database.sql"
$seedDataScript = Join-Path $scriptDir "migrations\seed_data.sql"

# Vérifier l'existence des fichiers
if (-not (Test-Path $createDbScript)) {
    Write-Host "❌ ERREUR: Fichier introuvable: $createDbScript" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $seedDataScript)) {
    Write-Host "❌ ERREUR: Fichier introuvable: $seedDataScript" -ForegroundColor Red
    exit 1
}

# Proposer les options
Write-Host "Que souhaitez-vous faire?" -ForegroundColor Cyan
Write-Host "1. Créer la base de données uniquement" -ForegroundColor White
Write-Host "2. Créer la base de données + données de test" -ForegroundColor White
Write-Host "3. Insérer seulement les données de test (BDD existe déjà)" -ForegroundColor White
Write-Host "4. Annuler" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Votre choix (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🔄 Création de la base de données..." -ForegroundColor Yellow
        
        if ([string]::IsNullOrWhiteSpace($mysqlPasswordPlain)) {
            & mysql -u $mysqlUser < $createDbScript
        } else {
            & mysql -u $mysqlUser -p"$mysqlPasswordPlain" < $createDbScript
        }
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Base de données créée avec succès!" -ForegroundColor Green
        } else {
            Write-Host "❌ Erreur lors de la création de la base de données" -ForegroundColor Red
            exit 1
        }
    }
    
    "2" {
        Write-Host ""
        Write-Host "🔄 Création de la base de données..." -ForegroundColor Yellow
        
        if ([string]::IsNullOrWhiteSpace($mysqlPasswordPlain)) {
            & mysql -u $mysqlUser < $createDbScript
        } else {
            & mysql -u $mysqlUser -p"$mysqlPasswordPlain" < $createDbScript
        }
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Erreur lors de la création de la base de données" -ForegroundColor Red
            exit 1
        }
        
        Write-Host "✅ Base de données créée!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🔄 Insertion des données de test..." -ForegroundColor Yellow
        
        if ([string]::IsNullOrWhiteSpace($mysqlPasswordPlain)) {
            & mysql -u $mysqlUser < $seedDataScript
        } else {
            & mysql -u $mysqlUser -p"$mysqlPasswordPlain" < $seedDataScript
        }
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Données de test insérées avec succès!" -ForegroundColor Green
        } else {
            Write-Host "❌ Erreur lors de l'insertion des données" -ForegroundColor Red
            exit 1
        }
    }
    
    "3" {
        Write-Host ""
        Write-Host "🔄 Insertion des données de test..." -ForegroundColor Yellow
        
        if ([string]::IsNullOrWhiteSpace($mysqlPasswordPlain)) {
            & mysql -u $mysqlUser < $seedDataScript
        } else {
            & mysql -u $mysqlUser -p"$mysqlPasswordPlain" < $seedDataScript
        }
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Données de test insérées avec succès!" -ForegroundColor Green
        } else {
            Write-Host "❌ Erreur lors de l'insertion des données" -ForegroundColor Red
            exit 1
        }
    }
    
    "4" {
        Write-Host ""
        Write-Host "❌ Installation annulée" -ForegroundColor Yellow
        exit 0
    }
    
    default {
        Write-Host ""
        Write-Host "❌ Choix invalide" -ForegroundColor Red
        exit 1
    }
}

# Afficher les statistiques
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "📊 Statistiques de la base de données" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

$statsQuery = "USE auto_service_platform; SELECT 'Users' as Table_Name, COUNT(*) as Count FROM users UNION ALL SELECT 'Services', COUNT(*) FROM services UNION ALL SELECT 'Vehicles', COUNT(*) FROM vehicles UNION ALL SELECT 'Orders', COUNT(*) FROM orders UNION ALL SELECT 'Payments', COUNT(*) FROM payments UNION ALL SELECT 'Reviews', COUNT(*) FROM reviews UNION ALL SELECT 'Notifications', COUNT(*) FROM notifications;"

if ([string]::IsNullOrWhiteSpace($mysqlPasswordPlain)) {
    & mysql -u $mysqlUser -e $statsQuery
} else {
    & mysql -u $mysqlUser -p"$mysqlPasswordPlain" -e $statsQuery
}

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "✅ Installation terminée avec succès!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Vérifier le fichier .env dans le backend" -ForegroundColor White
Write-Host "2. Mettre à jour les credentials MySQL si nécessaire" -ForegroundColor White
Write-Host "3. Lancer le serveur backend avec 'npm run start:dev'" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "- Lisez backend/database/README.md pour plus d'infos" -ForegroundColor White
Write-Host "- Consultez backend/DATABASE_SCHEMA.md pour le schéma" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Comptes de test:" -ForegroundColor Yellow
Write-Host "Admin: admin@autoservice.com / password123" -ForegroundColor White
Write-Host "Client: mohammed.alami@gmail.com / password123" -ForegroundColor White
Write-Host "Worker: karim.mechanic@gmail.com / password123" -ForegroundColor White
Write-Host ""
