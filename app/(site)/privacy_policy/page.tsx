import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-pink-600 text-center">Política de Privacidad</h1>
        <p className="text-center text-gray-500 mt-2">Última actualización: <span className="font-semibold">Marzo 17 2025</span></p>

        <div className="mt-6 space-y-6">
            <section>
                <h2 className="text-xl font-semibold text-pink-500">1. Información que Recopilamos</h2>
                <p>Cuando accede al panel de administración de la aplicación, podemos recopilar los siguientes datos:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Información de la cuenta:</strong> Nombre, correo electrónico, foto de perfil y credenciales de acceso.</li>
                    <li><strong>Datos de uso:</strong> Registro de actividad dentro del panel administrativo.</li>
                    <li><strong>Archivos y contenido:</strong> Imágenes, vídeos y otros recursos subidos desde el administrador.</li>
                    <li><strong>Información del dispositivo:</strong> Dirección IP, tipo de navegador y sistema operativo.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-pink-500">2. Uso de la Información</h2>
                <p>Utilizamos la información recopilada para:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Administrar y gestionar el acceso al panel de control.</li>
                    <li>Garantizar la seguridad y el correcto funcionamiento de la aplicación.</li>
                    <li>Mejorar la experiencia del usuario y la eficiencia de las funciones administrativas.</li>
                    <li>Detectar y prevenir fraudes o accesos no autorizados.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-pink-500">3. Compartición de Datos</h2>
                <p>No compartimos su información con terceros, excepto en los siguientes casos:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Cumplimiento legal:</strong> Si es requerido por la ley o autoridades gubernamentales.</li>
                    <li><strong>Proveedores de servicios:</strong> Para almacenamiento en la nube o herramientas analíticas (Firebase, AWS, etc.).</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-pink-500">4. Seguridad de los Datos</h2>
                <p>Implementamos medidas de seguridad para proteger su información, incluyendo:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Cifrado de datos sensibles.</li>
                    <li>Autenticación segura y protección de acceso con contraseña.</li>
                    <li>Monitoreo de actividad sospechosa en el sistema.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-pink-500">5. Derechos del Usuario</h2>
                <p>Como usuario administrador, usted tiene los siguientes derechos:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Acceder a su información personal.</li>
                    <li>Solicitar la eliminación de su cuenta y datos personales.</li>
                    <li>Actualizar o corregir su información.</li>
                    <li>Solicitar información sobre el uso de sus datos.</li>
                </ul>
                <p className="mt-2">Para ejercer cualquiera de estos derechos, puede contactarnos en: <a href='mailto:support@lashess-by-prii.com' className='text-blue-400 hover:text-blue-700'><strong>support@lashess-by-prii.com</strong></a></p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-pink-500">6. Cambios en la Política de Privacidad</h2>
                <p>Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre cambios importantes a través de la aplicación o por correo electrónico.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-pink-500">7. Contacto</h2>
                <p>Si tiene preguntas o inquietudes sobre esta Política de Privacidad, puede contactarnos en:</p>
                <p className="mt-2"><strong>📧 Correo Electrónico:</strong> <a href='mailto:contact@lashess-by-prii.com' className='text-blue-400 hover:text-blue-700'><strong>contact@lashess-by-prii.com</strong></a></p>
                <p><strong>🌐 Sitio Web:</strong> <a href='https://lashess-by-prii.com' target='_blank' className='text-blue-400 hover:text-blue-700'>https://lashess-by-prii.com</a></p>
            </section>
        </div>

        <p className="text-center text-gray-500 mt-8">© <span className="font-semibold">Lashess By Prii</span> - Todos los derechos reservados.</p>
    </div>
  )
}

export default PrivacyPolicy