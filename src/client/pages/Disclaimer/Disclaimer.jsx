import React from 'react';

import { InfoCard } from '../shared/Cards';

import PageHero from '../shared/PageHero';
import PageDivider from '../shared/PageDivider';

const Disclaimer = () => (
  <div>
    <PageHero bgColorClass="bg-secondary" bgImageClass="bg-img__dashboard" title="Disclaimer" />
    <PageDivider />
    <div className="container margin-vertical-big">
      <InfoCard item={{ name: 'Legal Disclaimer' }} bgColorClass="bg-primary">
        <p>The information contained on the devGaido website (the "Service") is for general information purposes only.</p>
        <p>devGaido assumes no responsibility for errors or omissions in the contents on the Service.</p>
        <p>In no event shall devGaido be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. devGaido reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice.</p>
        <p>devGaido does not warrant that the website is free of viruses or other harmful components.</p>
      </InfoCard>
      <InfoCard item={{ name: 'External links disclaimer' }} bgColorClass="bg-secondary">
        <p>The devGaido website contains links to external websites that are not provided or maintained by or in any way affiliated with devGaido</p>
        <p>Please note that the devGaido does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
      </InfoCard>
    </div>
  </div>
);


export default Disclaimer;
