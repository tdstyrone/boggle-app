import { Container, Row, Col, Card } from 'react-bootstrap';
import React from "react";
import '../scss/Board.scss';


function Board({board}) {

  function tile(id, letter) {
    return (
      <Col key={id} className="Tile">
        <Card>
          <Card.Body>{letter}</Card.Body>
        </Card>
      </Col>
    );
  }

  function rowOfTiles(id, rowObj) {
    return (
      <Row key={id}>
        {Object.keys(rowObj).map((letterKey) => {
          return tile(letterKey + id, rowObj[letterKey])
        })}
      </Row>
    );
  }

  function gridOfRows() {   
    return (
      <Container>
        {board.map((e, l) => {
          return rowOfTiles(l, e);
        })}
      </Container>
    );
  }

  return (
    <div className="Board-div">
      {gridOfRows()}
    </div>
  );
}

export default Board;