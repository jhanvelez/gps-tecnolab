import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Empresas" link="organizations" icon="building" />
      <MainMenuItem text="Conductores" link="drivers" icon="id-card" />
      <MainMenuItem text="Usuarios" link="users" icon="users" />
      <MainMenuItem text="Grupos" link="groups" icon="layer-group" />
      <MainMenuItem text="Roles" link="roles" icon="regular fa-dice-d6" />
      <MainMenuItem text="Mapa" link="dashboard" icon="map" />
    </div>
  );
};
