import pygame
import sys

# Inicializar pygame
game = pygame.init()

# Configuración de la ventana
ANCHO, ALTO = 640, 480
pantalla = pygame.display.set_mode((ANCHO, ALTO))
pygame.display.set_caption('Juego Básico')

# Colores
BLANCO = (255, 255, 255)
ROJO = (255, 0, 0)

# Jugador
jugador = pygame.Rect(300, 220, 40, 40)
velocidad = 5

# Bucle principal
ejecutando = True
while ejecutando:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            ejecutando = False

    teclas = pygame.key.get_pressed()
    if teclas[pygame.K_LEFT]:
        jugador.x -= velocidad
    if teclas[pygame.K_RIGHT]:
        jugador.x += velocidad
    if teclas[pygame.K_UP]:
        jugador.y -= velocidad
    if teclas[pygame.K_DOWN]:
        jugador.y += velocidad

    pantalla.fill(BLANCO)
    pygame.draw.rect(pantalla, ROJO, jugador)
    pygame.display.flip()

pygame.quit()
sys.exit()