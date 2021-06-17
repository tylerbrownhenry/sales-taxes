import * as React from 'react';

// Set type of catalog item
const Container = (props: any) => {
//   console.log('Container', props);
  // Correct! There is no need to specify the key here:
  return <Container><ul>{props.children}</ul></Container>;
}

export default Container;