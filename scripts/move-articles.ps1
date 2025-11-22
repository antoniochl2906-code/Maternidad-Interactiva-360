# Script PowerShell para mover artículos PDF a la ubicación correcta

Write-Host "Moviendo archivos PDF a /public/articles/..." -ForegroundColor Green

# Crear directorio si no existe
$destination = "public\articles"
if (-not (Test-Path $destination)) {
    New-Item -ItemType Directory -Path $destination -Force
    Write-Host "Directorio $destination creado." -ForegroundColor Yellow
}

# Directorio origen
$source = ".next\types\app\api\articles"

if (Test-Path $source) {
    # Mover todos los PDFs (excluyendo route.ts)
    Get-ChildItem -Path $source -Filter "*.pdf" | ForEach-Object {
        $destFile = Join-Path $destination $_.Name
        Copy-Item $_.FullName -Destination $destFile -Force
        Write-Host "Movido: $($_.Name) -> $destFile" -ForegroundColor Cyan
    }
    
    Write-Host "`n¡Archivos movidos exitosamente!" -ForegroundColor Green
    Write-Host "Ahora actualiza /data/articles.json con las entradas de estos archivos." -ForegroundColor Yellow
} else {
    Write-Host "No se encontró el directorio origen: $source" -ForegroundColor Red
}

