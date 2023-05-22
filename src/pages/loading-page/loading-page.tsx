import { CSSProperties } from 'react';
import { BarLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'block',
  margin: '25% auto',
  height: '4px',
  width: '200px',
};

function LoadingPage() {

  return (
    <BarLoader
      color={'#f2890f'}
      cssOverride={override}
    />
  );
}

export default LoadingPage;
