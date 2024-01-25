import { AmexLogo, MastercardLogo, DiscoverLogo, VisaLogo } from './Icons';
import { Banks } from './types';

type CcLogoProps = {
    issuingBank?: Banks
  }

export default function CcLogo(props: CcLogoProps){
    const {issuingBank} = props
    if (issuingBank === "American Express")return <AmexLogo/>
    if (issuingBank === "Visa")return <VisaLogo/>
    if (issuingBank === "Discover")return <DiscoverLogo/>
    if (issuingBank === "Mastercard")return <MastercardLogo/>
    return null
  }
  