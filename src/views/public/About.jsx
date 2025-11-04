import React from 'react';

const About = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h1 className="title-h1">Nuestra Historia</h1>
          <p className="p-generic">Somos una ferretería con más de 5 años de experiencia en el mercado. Desde nuestros inicios, nos hemos comprometido a proporcionar a nuestros clientes los productos y servicios de la más alta calidad. Nuestra pasión por la construcción y la mejora del hogar nos impulsa a ofrecer un amplio catálogo de herramientas, materiales y soluciones para sus proyectos.</p>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h1 className="title-h1">Nuestra Misión</h1>
          <p className="p-generic">Nuestra misión es ser el socio confiable de nuestros clientes en sus proyectos de construcción y renovación. Nos esforzamos por ofrecer productos duraderos y un servicio excepcional para satisfacer las necesidades de nuestros clientes y ayudarlos a alcanzar sus metas.</p>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h1 className="title-h1">Contáctanos</h1>
          <p className="p-generic">Estamos ubicados en Calle 2 #5-13 en Manta, Cundinamarca. Si tienes alguna pregunta o comentario, no dudes en contactarnos:</p>
          <ul className="list-unstyled">
            <li className="p-generic">Teléfono: [Número de teléfono]</li>
            <li className="p-generic">Correo Electrónico: construmanta@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
