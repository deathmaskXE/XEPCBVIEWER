import {brand} from '../../assets/brand';
export default function Logo({compact=false}){return <div className="logo" aria-label={brand.name}><span className="logoMark"><i></i><b>XE</b></span>{!compact&&<span><strong>{brand.name.toUpperCase()}</strong><small>{brand.tagline}</small></span>}</div>}
