
// Devido ao componente Container já possuir uma referência, é necessário a utilização do hook useRef
import React,{useRef} from 'react'
// Hook de drag in drop use drag faz a lógica de arastar e o use drop cria a funcionalidade adicionar o card em outra lista
import { useDrag, useDrop } from 'react-dnd';
import { Container,Label } from './styles';

export default function Card({ data,index}) {
  const ref = useRef();
  // Essa parte de código é o que cria a lógica de drag in drop
  const [ {isDragging }, dragRef] = useDrag({
    item:{ type:'CARD', index, id: data.id, content: data.content },
    collect:monitor=>({
      isDragging:monitor.isDragging(),

    })
  })

  const [, dropRef] = useDrop({
    accept:'CARD',
    hover(item,monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      if(draggedIndex === targetIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y = targetSize.top;

      // Essa condição não permite que um elemento que que está dragging e que não passou pelo elemento a ser trocado, mude de posição.
      // nesse caso, ele só faz o calculo de altura após o item ultrapassar a metade do item que o item selecionado quer trocar de posição.
      if(draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      // Essa verificação é ativada quando o item selecionado está abaixo do item a ser trocado
      if(draggedIndex > targetIndex && draggedTop > targetCenter) {

        // console.log('teste');
      }

      console.log('teste');

    }
  })
  // Criando a variavel useRef, eu consigo passar as duas refêrencias no componente
  dragRef(dropRef(ref));
  return (
    // o container recebe a referencia e o comportamento.
    <Container ref={ref} isDragging={isDragging}>
      <header>

        {data.labels.map(label => <Label key={label} color={label} />)}

      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="user"/>}

    </Container>
  )
}
