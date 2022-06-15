import React, { useState } from 'react';
import {Card, ListGroup} from 'react-bootstrap';


const TableOfContent = ({toc}) => {
    const[contentList, setContentList] = useState(toc);

  return (
    <Card>
        <Card.Body>
            <Card.Title className="course-header mb-3">Table of Content</Card.Title>
              <ListGroup variant="flush">
                        {contentList.map((content, i) => (
                            <ListGroup.Item key={i}>{content}</ListGroup.Item>
                        ))}
                </ListGroup>            
        </Card.Body>
    </Card>
  )
}

export default TableOfContent;
