import logo from '../components/constants/Copilot_20250912_191729.png';

const Logo = () => {
  return (
    <div className='text-center mb-2'>
      <img
        src={logo}
        alt=""
        width={70}
        style={{
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default Logo;
