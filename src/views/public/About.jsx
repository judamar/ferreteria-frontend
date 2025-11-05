import React from 'react';
import {ENV} from "../../config/env.js";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col justify-between gap-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="title-h1 mb-6">Nuestra Historia</h1>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed text-justify">Somos una ferretería con más de 5 años de experiencia en el mercado. Desde nuestros inicios, nos hemos comprometido a proporcionar a nuestros clientes los productos y servicios de la más alta calidad. Nuestra pasión por la construcción y la mejora del hogar nos impulsa a ofrecer un amplio catálogo de herramientas, materiales y soluciones para sus proyectos.</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="title-h1 mb-6">Nuestra Misión</h1>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed text-justify">Nuestra misión es ser el socio confiable de nuestros clientes en sus proyectos de construcción y renovación. Nos esforzamos por ofrecer productos duraderos y un servicio excepcional para satisfacer las necesidades de nuestros clientes y ayudarlos a alcanzar sus metas.</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="title-h1 mb-6">Contáctanos</h1>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed text-justify">Estamos ubicados en {ENV.DIR} en {ENV.CIUDAD}. Si tienes alguna pregunta o comentario, no dudes en contactarnos:</p>
          <ul className="list-none mt-2">
            <li className="text-gray-800 text-base md:text-lg leading-relaxed text-justify">Teléfono: {ENV.TEL}</li>
            <li className="text-gray-800 text-base md:text-lg leading-relaxed text-justify">Correo Electrónico: {ENV.EMAIL}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
