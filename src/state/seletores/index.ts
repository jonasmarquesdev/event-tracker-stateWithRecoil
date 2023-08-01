import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";

export const eventosFiltradosState = selector({
  key: "eventosFiltradosState",
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosOsEventos = get(listaDeEventosState);
    const eventos = todosOsEventos.filter((evento) => {
      if (!filtro.data) {
        return true;
      }
      const ehOMesmoDia =
        filtro.data.toISOString().slice(0, 10) ===
        evento.inicio.toISOString().slice(0, 10); // "2022-01-03...."
      return ehOMesmoDia;
    });
    return eventos;
  },
});
