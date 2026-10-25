import calldrhardwood from './images/calldrhardwood.jpeg';
import caseleap from './images/caseleap.jpeg';
import levitatefortech from './images/levitatefortech.jpeg';
import lourceyphoto from './images/lourceyphoto.jpeg';
import luxterraoutdoors from './images/luxterraoutdoors.jpeg';
import magnum from './images/magnum.png';
import neuroplay from './images/neuroplay.jpeg';
import one24 from './images/one24.jpeg';
import rayraysnaturalsoap from './images/rayraysnaturalsoap.jpeg';
import s2chief from './images/s2chief.png';
import zachary from './images/zacharyImg.png';

const projectImages = {
  calldrhardwood, caseleap, levitatefortech, lourceyphoto, luxterraoutdoors,
  magnum, neuroplay, one24, rayraysnaturalsoap, s2chief, zachary,
};

export function projectImage(source) {
  if (!source?.startsWith('local:')) return source;
  return projectImages[source.slice(6)] || '';
}
