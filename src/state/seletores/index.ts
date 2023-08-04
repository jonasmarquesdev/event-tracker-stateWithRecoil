import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";
import { IEvento } from "../../interfaces/IEvento";

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

// codigo para iniciar o json server { json-server --watch db.json -p 8080 }
export const eventosAsync = selector({
  key: 'eventosAsync',
  get: async () => {
    const respostaHttp = await fetch('http://localhost:8080/eventos')
    const eventosJson: IEvento[] = await respostaHttp.json()
    return eventosJson.map(evento => ({
      ...evento,
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim)
    }))
  }
})