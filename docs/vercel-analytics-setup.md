# Configuración de Vercel Analytics

## 📊 Estadísticas Públicas (Contadores visibles)

Los contadores en `/ia/asesoria/` son **estáticos** y debes actualizarlos manualmente.

### Cómo actualizar los números:

1. Abre `ia/asesoria/index.html`
2. Busca la sección `<!-- ESTADÍSTICAS -->` (línea 128)
3. Cambia los números:
   ```html
   <div class="stat-number">2,847</div>  <!-- Cambia este número -->
   ```

4. Actualiza la fecha al final:
   ```html
   Última actualización: Febrero 2026
   ```

5. Haz commit y push

### Sugerencia de actualización:
- **Mensualmente** - Actualiza "Visitas este mes"
- **Trimestralmente** - Actualiza los otros contadores

---

## 🔒 Analytics Privados (Vercel Analytics)

Con **Vercel Pro** ya tienes acceso a Vercel Analytics incluido.

### Configuración paso a paso:

#### 1. Activar Vercel Analytics

1. Ve a tu dashboard de Vercel: https://vercel.com/acestoy en vercel count
2. Selecciona tu proyecto: `IAZ`
3. En la pestaña "Analytics", haz clic en "Enable"
4. Vercel Analytics se activará automáticamente

#### 2. Ver tus estadísticas privadas

**Opción A: Dashboard en Vercel**
- Ve a: https://vercel.com/[tu-usuario]/iaz/analytics
- Verás:
  - Visitas únicas
  - Pageviews
  - Top páginas
  - Origen del tráfico
  - Ubicación geográfica
  - Dispositivos
  - Referrers

**Opción B: Integrar en tu web (dashboard privado)**

Si quieres ver las estadísticas dentro de tu sitio (en `/stats` por ejemplo), puedo crear una página protegida con password que muestre los datos de Vercel Analytics.

#### 3. Eventos personalizados

Para rastrear interacciones específicas:

```javascript
// Rastrear descarga del brochure
<a href="brochure.html" onclick="vercel.track('Download', { type: 'brochure' })">
  Descargar brochure
</a>

// Rastrear click en WhatsApp
<a href="https://wa.me/..." onclick="vercel.track('Contact', { method: 'whatsapp' })">
  WhatsApp
</a>

// Rastrear cuestionario completado
document.getElementById('cuestionarioForm').addEventListener('submit', () => {
  vercel.track('Questionnaire', { sector: document.getElementById('sector').value });
});
```

#### 4. Enlace directo a tu dashboard

Puedes añadir un enlace en el footer para acceso rápido:

```html
<a href="https://vercel.com/[tu-usuario]/iaz/analytics" target="_blank">
  📊 Analytics
</a>
```

---

## 🎯 Métricas recomendadas para seguir

### KPIs Principales:

1. **Tráfico**:
   - Visitas únicas por mes
   - Pageviews
   - Tasa de rebote (bounce rate)

2. **Interacción**:
   - Clics en "Solicitar asesoría"
   - Clics en WhatsApp
   - Descargas del brochure
   - Cuestionarios completados

3. **Conversión**:
   - Visitantes → Cuestionario
   - Visitantes → Contacto
   - Cuestionario → Contacto

4. **Origen del tráfico**:
   - Orgánico (Google, etc.)
   - Directo (escriben tu URL)
   - Redes sociales
   - Referidos (otros sitios)

---

## 📱 Dashboard Privado (Opcional)

Si quieres un dashboard **dentro de tu web** (no en Vercel), puedo crear:

- Página `/stats` protegida con password
- Gráficos de visitas, clics, descargas
- Actualización en tiempo real
- Filtros por fecha

**Ventaja:** Todo en un sitio, sin salir de tu web

**Desventaja:** Requiere más desarrollo y mantenimiento

---

## 🔄 Comparativa: Opciones de Analytics

| Opción | Coste | Privacy | Dashboard | Dificultad |
|--------|-------|---------|-----------|------------|
| **Vercel Analytics** | Incluido en Pro | ✅ Privacy-first | Vercel web | ⭐ Fácil |
| Plausible | €9/mes | ✅ Privacy-first | Propio + clean | ⭐⭐ Medio |
| Fathom | $14/mes | ✅ Privacy-first | Propio | ⭐⭐ Medio |
| Google Analytics 4 | Gratis | ❌ Tracking | Google web | ⭐ Fácil |

**Recomendación:** Usa **Vercel Analytics** (ya incluido en tu plan Pro).

---

## 📌 Próximos pasos

1. **Activar Vercel Analytics** en tu dashboard
2. **Actualizar los contadores públicos** mensualmente con los datos reales
3. **Añadir eventos personalizados** para rastrear conversiones
4. Revisar analytics **una vez al mes** para optimizar

¿Quieres que implemente alguna de estas funcionalidades adicionales?
