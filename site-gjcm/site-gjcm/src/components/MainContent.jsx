import { Cards } from "./components/Cards"
import { Eventos } from "./components/Eventos"

export function MainContent() {
    return (
        <div>
            <p>Uma verdadeira familia para se viver</p>
            <h1>Eventos</h1>
            <Eventos nome="Evento 1" descricao="Descrição do evento 1" />
            <Eventos nome="Evento 2" descricao="Descrição do evento 2" />
            <h1>Virtudes</h1>
            <Cards nome="Virtude 1" descricao="Descrição da virtude 1" />
            <Cards nome="Virtude 2" descricao="Descrição da virtude 2" />
        </div>
    )
}