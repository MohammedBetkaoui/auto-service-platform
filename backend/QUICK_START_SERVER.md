# 🚀 Guide de Démarrage Rapide

## Problème Actuel
L'application compile sans erreur mais ne démarre pas car le dossier `dist` n'est pas correctement généré.

## Solution : Démarrage Manuel

### 1. Naviguer vers le dossier backend
```powershell
cd C:\Users\HP\OneDrive\Desktop\auto-service-platform\backend
```

### 2. Compiler manuellement
```powershell
npx nest build
```

### 3. Démarrer l'application
```powershell
node dist/main
```

## Alternative : Utiliser npm start

```powershell
cd C:\Users\HP\OneDrive\Desktop\auto-service-platform\backend
npm run start
```

## Test Rapide des Endpoints

### 1. Tester que le serveur démarre
Après le démarrage, vous devriez voir :
```
🚀 Application is running on: http://localhost:3000/api
```

### 2. Tester l'inscription (depuis un nouveau terminal)
```powershell
$body = @{
    full_name = "Test User"
    email = "test@example.com"
    password = "TestPass123!"
    phone = "+212600000000"
    role = "client"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method POST -ContentType "application/json" -Body $body
```

### 3. Tester la connexion avec un compte existant
```powershell
$body = @{
    email = "mohammed.alami@gmail.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -ContentType "application/json" -Body $body
```

## Si MySQL n'est pas démarré

1. Démarrer XAMPP
2. Cliquer sur "Start" pour MySQL
3. Ou utiliser :
```powershell
net start MySQL
```

## Checklist

- [ ] MySQL démarré
- [ ] Base de données "auto_service_platform" existe
- [ ] Dossier backend ouvert
- [ ] npm install exécuté
- [ ] Compilation réussie
- [ ] Serveur démarré sur port 3000

## Commandes Utiles

```powershell
# Voir si le port 3000 est utilisé
netstat -ano | findstr :3000

# Arrêter un processus sur le port 3000
# (Remplacer PID par le numéro de processus)
taskkill /PID <PID> /F

# Tester la connexion MySQL
mysql -u root -p -e "USE auto_service_platform; SHOW TABLES;"
```
