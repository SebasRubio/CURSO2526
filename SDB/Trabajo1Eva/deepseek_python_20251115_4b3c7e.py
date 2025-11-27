import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

class GeneradorDatosEducativos:
    def __init__(self, semilla=42):
        self.semilla = semilla
        np.random.seed(semilla)
        random.seed(semilla)
        
        # Configuración de datos
        self.ciudades = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza', 
                        'Málaga', 'Murcia', 'Granada', 'Alicante', 'Córdoba', 'Valladolid',
                        'Vigo', 'Gijón', 'Palma de Mallorca', 'Santa Cruz de Tenerife']
        
        self.materias = ['Matemáticas', 'Lengua', 'Ciencias', 'Historia', 'Inglés', 'Educación Física']
        
        self.actividades = ['Deportes', 'Música', 'Robótica', 'Debate', 'Teatro', 'Periodismo', 'Voluntariado']
        
        self.logros_deportes = ['Campeonato regional', 'Liga municipal', 'Torneo local', 'Equipo escolar', 'Primera división juvenil']
        self.logros_musica = ['Concierto escolar', 'Concierto orquesta', 'Cor escolar', 'Concierto benéfico', 'Concierto sinfónico']
        self.logros_robotica = ['Primer puesto nacional', 'Segundo puesto concurso', 'Primer puesto regional', 'Participación concurso', 'Participación inicial']
        self.logros_debate = ['Finalista torneo', 'Campeón autonómico', 'Semifinalista', 'Participación torneo']
        self.logros_teatro = ['Obra escolar', 'Festival escolar', 'Obra teatral']
        self.logros_periodismo = ['Revista escolar', 'Editor joven']
        self.logros_voluntariado = ['Programa comunitario', 'Programa social']
    
    def generar_estudiantes(self, n_estudiantes=200):
        estudiantes = []
        
        for i in range(1, n_estudiantes + 1):
            estudiante_id = f"EST{str(i).zfill(3)}"
            edad = random.randint(14, 18)
            genero = random.choice(['M', 'F'])
            ciudad = random.choice(self.ciudades)
            nivel_educativo = 'Secundaria' if edad < 17 else 'Bachillerato'
            estrato = random.choice(['Bajo', 'Medio', 'Alto'])
            tipo_colegio = random.choices(['Público', 'Concertado', 'Privado'], 
                                        weights=[0.6, 0.3, 0.1])[0]
            
            # Asignar idioma nativo según ciudad
            if ciudad in ['Barcelona', 'Palma de Mallorca', 'Lleida', 'Tarragona', 'Girona']:
                idioma = 'Catalán'
            elif ciudad in ['Bilbao', 'San Sebastián', 'Vitoria']:
                idioma = 'Euskera'
            elif ciudad in ['Vigo']:
                idioma = 'Gallego'
            elif ciudad in ['Valencia', 'Alicante']:
                idioma = 'Valenciano'
            else:
                idioma = 'Español'
            
            estudiantes.append({
                'estudiante_id': estudiante_id,
                'edad': edad,
                'genero': genero,
                'ciudad': ciudad,
                'nivel_educativo': nivel_educativo,
                'estrato_socioeconomico': estrato,
                'tipo_colegio': tipo_colegio,
                'idioma_nativo': idioma
            })
        
        return pd.DataFrame(estudiantes)
    
    def generar_calificaciones(self, estudiantes_df, n_trimestres=3):
        calificaciones = []
        
        for _, estudiante in estudiantes_df.iterrows():
            estudiante_id = estudiante['estudiante_id']
            estrato = estudiante['estrato_socioeconomico']
            tipo_colegio = estudiante['tipo_colegio']
            
            # Ajustar calificaciones base según características del estudiante
            if estrato == 'Alto':
                base_calif = 7.5
            elif estrato == 'Medio':
                base_calif = 6.5
            else:
                base_calif = 5.5
                
            if tipo_colegio == 'Privado':
                base_calif += 0.5
            elif tipo_colegio == 'Concertado':
                base_calif += 0.2
            
            for trimestre in range(1, n_trimestres + 1):
                for materia in self.materias:
                    # Variar calificación por materia
                    if materia == 'Matemáticas':
                        variacion = random.uniform(-1.0, 1.0)
                    elif materia == 'Educación Física':
                        variacion = random.uniform(0.0, 1.5)
                    else:
                        variacion = random.uniform(-0.5, 0.5)
                    
                    calificacion = max(0, min(10, base_calif + variacion + random.gauss(0, 0.8)))
                    
                    # Asistencia relacionada con calificación
                    if calificacion >= 7:
                        asistencia = random.randint(85, 100)
                    elif calificacion >= 5:
                        asistencia = random.randint(75, 90)
                    else:
                        asistencia = random.randint(60, 80)
                    
                    # Participación en clase
                    if calificacion >= 8:
                        participacion = random.choices(['Alta', 'Media', 'Baja'], weights=[0.7, 0.2, 0.1])[0]
                    elif calificacion >= 6:
                        participacion = random.choices(['Alta', 'Media', 'Baja'], weights=[0.2, 0.6, 0.2])[0]
                    else:
                        participacion = random.choices(['Alta', 'Media', 'Baja'], weights=[0.1, 0.3, 0.6])[0]
                    
                    calificaciones.append({
                        'estudiante_id': estudiante_id,
                        'materia': materia,
                        'trimestre': trimestre,
                        'calificacion': round(calificacion, 1),
                        'asistencia_porcentaje': asistencia,
                        'participacion_clase': participacion
                    })
        
        return pd.DataFrame(calificaciones)
    
    def generar_actividades(self, estudiantes_df):
        actividades = []
        
        for _, estudiante in estudiantes_df.iterrows():
            estudiante_id = estudiante['estudiante_id']
            estrato = estudiante['estrato_socioeconomico']
            
            # Número de actividades por estudiante (depende del estrato)
            if estrato == 'Alto':
                n_actividades = random.choices([1, 2, 3], weights=[0.2, 0.5, 0.3])[0]
            elif estrato == 'Medio':
                n_actividades = random.choices([0, 1, 2], weights=[0.3, 0.5, 0.2])[0]
            else:
                n_actividades = random.choices([0, 1], weights=[0.6, 0.4])[0]
            
            actividades_seleccionadas = random.sample(self.actividades, min(n_actividades, len(self.actividades)))
            
            for actividad in actividades_seleccionadas:
                horas_semana = random.randint(1, 6)
                participacion_anios = random.randint(1, 4)
                
                # Asignar logros según la actividad
                if actividad == 'Deportes':
                    logro = random.choice(self.logros_deportes)
                elif actividad == 'Música':
                    logro = random.choice(self.logros_musica)
                elif actividad == 'Robótica':
                    logro = random.choice(self.logros_robotica)
                elif actividad == 'Debate':
                    logro = random.choice(self.logros_debate)
                elif actividad == 'Teatro':
                    logro = random.choice(self.logros_teatro)
                elif actividad == 'Periodismo':
                    logro = random.choice(self.logros_periodismo)
                else:  # Voluntariado
                    logro = random.choice(self.logros_voluntariado)
                
                actividades.append({
                    'estudiante_id': estudiante_id,
                    'actividad_tipo': actividad,
                    'horas_semana': horas_semana,
                    'participacion_anios': participacion_anios,
                    'logros': logro
                })
        
        return pd.DataFrame(actividades)

def main():
    # Configuración
    n_estudiantes = 400  # Puede cambiar este número
    n_trimestres = 3     # Puede cambiar este número
    
    # Generador
    generador = GeneradorDatosEducativos(semilla=42)
    
    print("Generando datasets educativos...")
    
    # Generar datasets
    estudiantes_df = generador.generar_estudiantes(n_estudiantes)
    calificaciones_df = generador.generar_calificaciones(estudiantes_df, n_trimestres)
    actividades_df = generador.generar_actividades(estudiantes_df)
    
    # Guardar en CSV
    estudiantes_df.to_csv('estudiantes.csv', index=False, encoding='utf-8')
    calificaciones_df.to_csv('calificaciones.csv', index=False, encoding='utf-8')
    actividades_df.to_csv('actividades_extracurriculares.csv', index=False, encoding='utf-8')
    
    # Mostrar resumen
    print(f"\n✅ Datasets generados exitosamente:")
    print(f"   📊 Estudiantes: {len(estudiantes_df)} registros")
    print(f"   📈 Calificaciones: {len(calificaciones_df)} registros")
    print(f"   🎯 Actividades: {len(actividades_df)} registros")
    print(f"\n💾 Archivos guardados como:")
    print(f"   • estudiantes.csv")
    print(f"   • calificaciones.csv") 
    print(f"   • actividades_extracurriculares.csv")
    
    # Mostrar primeras filas de cada dataset
    print(f"\n🔍 Vista previa de los datos:")
    print(f"\nEstudiantes (primeras 5 filas):")
    print(estudiantes_df.head())
    print(f"\nCalificaciones (primeras 5 filas):")
    print(calificaciones_df.head())
    print(f"\nActividades (primeras 5 filas):")
    print(actividades_df.head())

if __name__ == "__main__":
    main()