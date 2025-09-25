import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    servicio: "",
    mensaje: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const formRef = useRef(null);

  // Observador para animar secciones al entrar en vista
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Gracias por tu solicitud. Nos pondremos en contacto contigo pronto.");
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      empresa: "",
      servicio: "",
      mensaje: "",
    });
  };

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-700">
      {/* Header Fijo */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
                Nex-v
              </span>
            </div>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {[
                { id: "inicio", label: "Inicio" },
                { id: "quienes-somos", label: "Quiénes Somos" },
                { id: "servicios", label: "Servicios" },
                { id: "contacto", label: "Contacto" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contacto")}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all font-medium whitespace-nowrap"
              >
                Asesoría Gratuita
              </button>
            </nav>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl">
            <div className="px-4 py-3 space-y-1">
              {[
                { id: "inicio", label: "Inicio" },
                { id: "quienes-somos", label: "Quiénes Somos" },
                { id: "servicios", label: "Servicios" },
                { id: "contacto", label: "Contacto" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contacto")}
                className="w-full mt-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full font-medium hover:shadow-md"
              >
                Asesoría Gratuita
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative pt-20 md:pt-24 min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-green-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Impulsa tu negocio con
              <span className="text-blue-600 block sm:inline"> presencia digital</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl leading-relaxed">
              Ayudamos a pequeñas y medianas empresas a crecer online con páginas web profesionales, gestión de redes sociales y estrategias digitales efectivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("contacto")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all"
              >
                Pide tu asesoría gratuita
              </button>
              <button
                onClick={() => scrollToSection("servicios")}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white hover:shadow-xl hover:scale-105 transition-all"
              >
                Ver nuestros servicios
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section
        id="quienes-somos"
        className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-6 py-2 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full mb-4">
              Nuestra Historia
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Quiénes <span className="text-blue-600">Somos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformamos ideas en presencia digital real. No somos solo otra agencia, somos tu socio estratégico.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      Nuestra Misión
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Democratizar el acceso al marketing digital, proporcionando herramientas y estrategias que permitan a cualquier empresa competir en el mundo digital.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Nuestros Valores
                </h3>
                <ul className="space-y-4">
                  {[
                    { text: "Resultados medibles y reales", color: "text-green-500" },
                    { text: "Trato cercano y personalizado", color: "text-purple-500" },
                    { text: "Precios transparentes, sin sorpresas", color: "text-orange-500" },
                    { text: "Innovación constante", color: "text-blue-500" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <svg className={`w-5 h-5 ${item.color}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 text-white text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">+150</div>
                  <div className="text-lg opacity-90">Proyectos Completados</div>
                </div>
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border border-blue-200">
                  <p className="text-gray-600 mb-4">
                    ¿Quieres saber cómo podemos ayudarte a alcanzar tus objetivos?
                  </p>
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all w-full sm:w-auto"
                  >
                    Habla con nuestro equipo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Nuestros Servicios y Packs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos soluciones digitales completas adaptadas a las necesidades de tu negocio
            </p>
          </div>

          {/* Packs de Servicios */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {/* Pack Básico */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-2xl hover:border-gray-300 transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pack Básico</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-blue-600">299€</span>
                  <span className="text-gray-600 ml-1">/mes</span>
                </div>
                <p className="text-gray-600">Perfecto para empezar tu presencia digital</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Página web responsive",
                  "Gestión básica de redes",
                  "2 publicaciones semanales",
                  "Google My Business",
                  "Soporte por email"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => scrollToSection("contacto")}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-full font-semibold transition-colors"
              >
                Solicitar Información
              </button>
            </div>

            {/* Pack Medio */}
            <div className="relative bg-white border-2 border-blue-600 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2 rounded-full text-white text-sm font-semibold">
                Más Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pack Medio</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-blue-600">599€</span>
                  <span className="text-gray-600 ml-1">/mes</span>
                </div>
                <p className="text-gray-600">La opción más popular para hacer crecer tu negocio</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Página web avanzada",
                  "Gestión completa de redes",
                  "5 publicaciones semanales",
                  "Blog mensual",
                  "SEO básico",
                  "Analíticas",
                  "Soporte prioritario"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => scrollToSection("contacto")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Solicitar Información
              </button>
            </div>

            {/* Pack Premium */}
            <div className="bg-white border-2 border-green-500 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-2xl hover:border-green-600 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pack Premium</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-blue-600">999€</span>
                  <span className="text-gray-600 ml-1">/mes</span>
                </div>
                <p className="text-gray-600">Solución completa para empresas ambiciosas</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Página web ilimitada",
                  "Gestión premium de redes",
                  "Publicaciones diarias",
                  "Blog con 4 artículos",
                  "SEO avanzado",
                  "Campañas de publicidad",
                  "Consultor dedicado"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => scrollToSection("contacto")}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Solicitar Información
              </button>
            </div>
          </div>

          {/* Servicios Individuales */}
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              También Ofrecemos Servicios Individuales
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "🌐", title: "Desarrollo Web", desc: "Páginas rápidas y optimizadas" },
              { icon: "📱", title: "Redes Sociales", desc: "Contenido de calidad profesional" },
              { icon: "🔍", title: "SEO & SEM", desc: "Posicionamiento en Google" },
              { icon: "📊", title: "Analíticas", desc: "Medimos cada acción" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-xl hover:bg-white transition-all duration-300 cursor-pointer">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por Qué Elegirnos? */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              ¿Por Qué Elegir Nex-v?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos más que una agencia digital. Somos tu socio estratégico para el crecimiento online.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: "💼", title: "Trato Personalizado", desc: "Cada cliente es único para nosotros." },
              { icon: "📈", title: "Resultados Medibles", desc: "Te mostramos el impacto real de nuestro trabajo." },
              { icon: "📍", title: "Conocimiento Local", desc: "Entendemos tu mercado y competencia." },
              { icon: "💰", title: "Precios Transparentes", desc: "Sin costes ocultos ni sorpresas." },
              { icon: "🤝", title: "Soporte Continuo", desc: "Estamos aquí cuando nos necesites." },
              { icon: "🚀", title: "Implementación Rápida", desc: "Primeros resultados en 30 días." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              ¿Listo para Impulsar tu Negocio?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solicita tu asesoría gratuita y descubre cómo podemos ayudarte a crecer digitalmente
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Formulario */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Solicita tu Asesoría Gratuita</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Empresa</label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Servicio de Interés</label>
                  <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white cursor-pointer"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="pack-basico">Pack Básico</option>
                    <option value="pack-medio">Pack Medio</option>
                    <option value="pack-premium">Pack Premium</option>
                    <option value="web">Desarrollo Web</option>
                    <option value="redes">Redes Sociales</option>
                    <option value="seo">SEO & SEM</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows="4"
                    maxLength="500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors resize-none"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  ></textarea>
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.mensaje.length}/500 caracteres
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  Solicitar Asesoría Gratuita
                </button>
              </form>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-8">
              <div className="hover:shadow-lg p-6 rounded-lg transition-shadow">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Información de Contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Dirección</h4>
                      <p className="text-gray-600">Calle Digital, 123<br />28001 Madrid, España</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Teléfono</h4>
                      <p className="text-gray-600">+34 900 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600">hola@nex-v.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Horario</h4>
                      <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white hover:shadow-xl transition-all duration-300">
                <h4 className="font-bold text-xl mb-4">¿Prefieres llamarnos?</h4>
                <p className="mb-4">Estamos aquí para resolver tus dudas.</p>
                <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Llamar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold text-blue-400">Nex-v</span>
              <p className="text-gray-300 mt-4">Tu agencia digital de confianza.</p>
              <div className="flex space-x-4 mt-6">
                {["Facebook", "Instagram", "LinkedIn", "Twitter"].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all"
                  >
                    <span className="text-sm font-bold">{social.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Servicios</h3>
              <ul className="space-y-2">
                {["Desarrollo Web", "Redes Sociales", "SEO & SEM", "Analíticas", "Consultoría"].map((item, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollToSection("servicios")}
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Empresa</h3>
              <ul className="space-y-2">
                {["Quiénes Somos", "Nuestro Equipo", "Casos de Éxito", "Blog", "Contacto"].map((item, i) => (
                  <li key={i}>
                    <button
                      onClick={() => item === "Contacto" ? scrollToSection("contacto") : item === "Quiénes Somos" ? scrollToSection("quienes-somos") : null}
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Contacto</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Calle Digital, 123</p>
                <p>28001 Madrid, España</p>
                <p>+34 900 123 456</p>
                <p>hola@nex-v.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 Nex-v. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;