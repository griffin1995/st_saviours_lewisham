// CMS DATA SOURCE: Normalized church data structure following React official patterns
// Based on React docs hierarchical data management pattern
// Similar to travel plan example but for church organizational structure

export interface ChurchEntity {
  id: string;
  type: 'parish' | 'ministry' | 'group' | 'event' | 'sacrament' | 'service';
  title: string;
  description?: string;
  childIds: string[];
  parentId?: string;
  metadata?: {
    contactInfo?: {
      email?: string;
      phone?: string;
      coordinator?: string;
    };
    schedule?: {
      day?: string;
      time?: string;
      frequency?: string;
    };
    location?: string;
    ageGroup?: string;
    requirements?: string[];
    imageId?: string;
  };
}

// CMS DATA SOURCE: Normalized church structure data
export const churchStructure: Record<string, ChurchEntity> = {
  '0': {
    id: '0',
    type: 'parish',
    title: 'St Saviour\'s Catholic Church',
    description: 'Parish root',
    childIds: ['ministries', 'groups', 'services', 'sacraments'],
  },
  'ministries': {
    id: 'ministries',
    type: 'ministry',
    title: 'Parish Ministries',
    description: 'All parish ministry areas',
    childIds: ['liturgy', 'pastoral-care', 'outreach', 'youth'],
    parentId: '0',
  },
  'liturgy': {
    id: 'liturgy',
    type: 'ministry',
    title: 'Liturgy & Worship',
    description: 'Supporting our liturgical celebrations',
    childIds: ['altar-servers', 'readers', 'eucharistic-ministers', 'choir'],
    parentId: 'ministries',
    metadata: {
      contactInfo: {
        coordinator: 'Parish Office',
        email: 'parish@saintsaviours.org.uk',
        phone: '020 8852 7411'
      }
    }
  },
  'altar-servers': {
    id: 'altar-servers',
    type: 'group',
    title: 'Altar Servers',
    description: 'Young people assisting at Mass',
    childIds: [],
    parentId: 'liturgy',
    metadata: {
      ageGroup: '8-18 years',
      schedule: {
        day: 'Sunday',
        time: '10:30 AM Mass',
        frequency: 'Weekly'
      },
      requirements: ['Training provided', 'Regular attendance expected']
    }
  },
  'readers': {
    id: 'readers',
    type: 'group',
    title: 'Readers (Lectors)',
    description: 'Proclaiming the Word of God at Mass',
    childIds: [],
    parentId: 'liturgy',
    metadata: {
      ageGroup: 'Adults',
      schedule: {
        frequency: 'Rota basis'
      },
      requirements: ['Clear speaking voice', 'Commitment to preparation']
    }
  },
  'eucharistic-ministers': {
    id: 'eucharistic-ministers',
    type: 'group',
    title: 'Eucharistic Ministers',
    description: 'Assisting with Holy Communion',
    childIds: [],
    parentId: 'liturgy',
    metadata: {
      ageGroup: 'Adults',
      requirements: ['Catholic in good standing', 'Diocesan training required']
    }
  },
  'choir': {
    id: 'choir',
    type: 'group',
    title: 'Parish Choir',
    description: 'Leading congregational singing',
    childIds: [],
    parentId: 'liturgy',
    metadata: {
      ageGroup: 'All ages welcome',
      schedule: {
        day: 'Thursday',
        time: '7:30 PM',
        frequency: 'Weekly practice'
      }
    }
  },
  'pastoral-care': {
    id: 'pastoral-care',
    type: 'ministry',
    title: 'Pastoral Care',
    description: 'Supporting parishioners in need',
    childIds: ['bereavement-support', 'hospital-visitors', 'homebound-ministry'],
    parentId: 'ministries'
  },
  'bereavement-support': {
    id: 'bereavement-support',
    type: 'group',
    title: 'Bereavement Support',
    description: 'Supporting families during loss',
    childIds: [],
    parentId: 'pastoral-care',
    metadata: {
      contactInfo: {
        coordinator: 'Parish Office',
        phone: '020 8852 7411'
      }
    }
  },
  'hospital-visitors': {
    id: 'hospital-visitors',
    type: 'group',
    title: 'Hospital Visitors',
    description: 'Visiting sick parishioners',
    childIds: [],
    parentId: 'pastoral-care',
    metadata: {
      requirements: ['DBS check required', 'Hospital training needed']
    }
  },
  'homebound-ministry': {
    id: 'homebound-ministry',
    type: 'group',
    title: 'Homebound Ministry',
    description: 'Bringing Communion to those unable to attend Mass',
    childIds: [],
    parentId: 'pastoral-care',
    metadata: {
      requirements: ['Eucharistic Minister training', 'Regular commitment']
    }
  },
  'outreach': {
    id: 'outreach',
    type: 'ministry',
    title: 'Outreach & Service',
    description: 'Serving the wider community',
    childIds: ['st-vincent-de-paul', 'foodbank', 'homeless-outreach'],
    parentId: 'ministries'
  },
  'st-vincent-de-paul': {
    id: 'st-vincent-de-paul',
    type: 'group',
    title: 'St Vincent de Paul Society',
    description: 'Practical help for those in need',
    childIds: [],
    parentId: 'outreach',
    metadata: {
      schedule: {
        day: 'Tuesday',
        time: '7:00 PM',
        frequency: 'Monthly'
      },
      contactInfo: {
        coordinator: 'SVP President',
        email: 'svp@saintsaviours.org.uk'
      }
    }
  },
  'foodbank': {
    id: 'foodbank',
    type: 'group',
    title: 'Foodbank Support',
    description: 'Supporting local foodbank initiatives',
    childIds: [],
    parentId: 'outreach',
    metadata: {
      schedule: {
        frequency: 'Ongoing collection'
      }
    }
  },
  'homeless-outreach': {
    id: 'homeless-outreach',
    type: 'group',
    title: 'Homeless Outreach',
    description: 'Supporting rough sleepers and homeless individuals',
    childIds: [],
    parentId: 'outreach'
  },
  'youth': {
    id: 'youth',
    type: 'ministry',
    title: 'Youth Ministry',
    description: 'Engaging young people in faith',
    childIds: ['youth-group', 'confirmation-prep', 'scouts'],
    parentId: 'ministries'
  },
  'youth-group': {
    id: 'youth-group',
    type: 'group',
    title: 'Youth Group',
    description: 'Social and faith activities for teens',
    childIds: [],
    parentId: 'youth',
    metadata: {
      ageGroup: '13-18 years',
      schedule: {
        day: 'Friday',
        time: '7:00 PM',
        frequency: 'Fortnightly'
      }
    }
  },
  'confirmation-prep': {
    id: 'confirmation-prep',
    type: 'group',
    title: 'Confirmation Preparation',
    description: 'Preparing young people for Confirmation',
    childIds: [],
    parentId: 'youth',
    metadata: {
      ageGroup: '14+ years',
      schedule: {
        day: 'Sunday',
        time: '12:00 PM',
        frequency: 'Weekly during preparation period'
      }
    }
  },
  'scouts': {
    id: 'scouts',
    type: 'group',
    title: 'Catholic Scout Group',
    description: 'Scouting with Catholic values',
    childIds: [],
    parentId: 'youth',
    metadata: {
      ageGroup: '6-18 years',
      schedule: {
        day: 'Wednesday',
        time: '6:30 PM',
        frequency: 'Weekly during term'
      }
    }
  },
  'groups': {
    id: 'groups',
    type: 'ministry',
    title: 'Parish Groups',
    description: 'Community and social groups',
    childIds: ['catholic-womens-league', 'mens-group', 'senior-citizens'],
    parentId: '0'
  },
  'catholic-womens-league': {
    id: 'catholic-womens-league',
    type: 'group',
    title: 'Catholic Women\'s League',
    description: 'Fellowship and service for women',
    childIds: [],
    parentId: 'groups',
    metadata: {
      ageGroup: 'Adult women',
      schedule: {
        day: 'First Tuesday',
        time: '2:00 PM',
        frequency: 'Monthly'
      }
    }
  },
  'mens-group': {
    id: 'mens-group',
    type: 'group',
    title: 'Men\'s Group',
    description: 'Fellowship and faith sharing for men',
    childIds: [],
    parentId: 'groups',
    metadata: {
      ageGroup: 'Adult men',
      schedule: {
        day: 'Saturday',
        time: '8:00 AM',
        frequency: 'Monthly'
      }
    }
  },
  'senior-citizens': {
    id: 'senior-citizens',
    type: 'group',
    title: 'Senior Citizens Group',
    description: 'Social activities for older parishioners',
    childIds: [],
    parentId: 'groups',
    metadata: {
      ageGroup: '60+ years',
      schedule: {
        day: 'Thursday',
        time: '2:00 PM',
        frequency: 'Weekly'
      }
    }
  },
  'services': {
    id: 'services',
    type: 'ministry',
    title: 'Parish Services',
    description: 'Regular parish services and events',
    childIds: ['masses', 'special-services', 'devotions'],
    parentId: '0'
  },
  'masses': {
    id: 'masses',
    type: 'service',
    title: 'Regular Masses',
    description: 'Weekly Mass schedule',
    childIds: [],
    parentId: 'services',
    metadata: {
      schedule: {
        frequency: 'See Mass times page for current schedule'
      }
    }
  },
  'special-services': {
    id: 'special-services',
    type: 'service',
    title: 'Special Services',
    description: 'Seasonal and special liturgies',
    childIds: [],
    parentId: 'services'
  },
  'devotions': {
    id: 'devotions',
    type: 'service',
    title: 'Prayer & Devotions',
    description: 'Rosary, Adoration, and other devotions',
    childIds: [],
    parentId: 'services'
  },
  'sacraments': {
    id: 'sacraments',
    type: 'ministry',
    title: 'Sacraments',
    description: 'Sacramental preparation and celebration',
    childIds: ['baptism-prep', 'first-communion-prep', 'marriage-prep', 'rcia'],
    parentId: '0'
  },
  'baptism-prep': {
    id: 'baptism-prep',
    type: 'group',
    title: 'Baptism Preparation',
    description: 'Preparing parents for infant baptism',
    childIds: [],
    parentId: 'sacraments',
    metadata: {
      ageGroup: 'Parents and godparents',
      schedule: {
        frequency: 'By arrangement'
      },
      requirements: ['Advance booking required']
    }
  },
  'first-communion-prep': {
    id: 'first-communion-prep',
    type: 'group',
    title: 'First Holy Communion',
    description: 'Preparing children for First Communion',
    childIds: [],
    parentId: 'sacraments',
    metadata: {
      ageGroup: '7-8 years',
      schedule: {
        day: 'Sunday',
        time: '11:45 AM',
        frequency: 'Weekly during preparation period'
      }
    }
  },
  'marriage-prep': {
    id: 'marriage-prep',
    type: 'group',
    title: 'Marriage Preparation',
    description: 'Preparing couples for Catholic marriage',
    childIds: [],
    parentId: 'sacraments',
    metadata: {
      ageGroup: 'Engaged couples',
      requirements: ['6 months notice required', 'Preparation course mandatory']
    }
  },
  'rcia': {
    id: 'rcia',
    type: 'group',
    title: 'RCIA (Rite of Christian Initiation)',
    description: 'Journey to becoming Catholic',
    childIds: [],
    parentId: 'sacraments',
    metadata: {
      ageGroup: 'Adults seeking to become Catholic',
      schedule: {
        day: 'Wednesday',
        time: '7:30 PM',
        frequency: 'Weekly'
      }
    }
  }
};

// CMS DATA SOURCE: Church structure utilities following React patterns
export function getChurchEntity(id: string): ChurchEntity | undefined {
  return churchStructure[id];
}

export function getChurchChildren(parentId: string): ChurchEntity[] {
  const parent = getChurchEntity(parentId);
  if (!parent) return [];
  
  return parent.childIds
    .map(id => getChurchEntity(id))
    .filter((entity): entity is ChurchEntity => entity !== undefined);
}

export function getChurchParent(childId: string): ChurchEntity | undefined {
  const child = getChurchEntity(childId);
  if (!child?.parentId) return undefined;
  
  return getChurchEntity(child.parentId);
}

export function getAllChurchEntitiesByType(type: ChurchEntity['type']): ChurchEntity[] {
  return Object.values(churchStructure).filter(entity => entity.type === type);
}

export function getChurchPath(entityId: string): ChurchEntity[] {
  const path: ChurchEntity[] = [];
  let current = getChurchEntity(entityId);
  
  while (current) {
    path.unshift(current);
    current = current.parentId ? getChurchEntity(current.parentId) : undefined;
  }
  
  return path;
}

// CMS DATA SOURCE: Church structure update utilities (immutable updates)
export function addChurchEntity(
  structure: Record<string, ChurchEntity>,
  parentId: string,
  newEntity: ChurchEntity
): Record<string, ChurchEntity> {
  const parent = structure[parentId];
  if (!parent) return structure;

  const updatedParent = {
    ...parent,
    childIds: [...parent.childIds, newEntity.id]
  };

  return {
    ...structure,
    [parentId]: updatedParent,
    [newEntity.id]: { ...newEntity, parentId }
  };
}

export function removeChurchEntity(
  structure: Record<string, ChurchEntity>,
  parentId: string,
  entityId: string
): Record<string, ChurchEntity> {
  const parent = structure[parentId];
  if (!parent) return structure;

  const updatedParent = {
    ...parent,
    childIds: parent.childIds.filter(id => id !== entityId)
  };

  const { [entityId]: removed, ...remainingStructure } = structure;

  return {
    ...remainingStructure,
    [parentId]: updatedParent
  };
}

export function updateChurchEntity(
  structure: Record<string, ChurchEntity>,
  entityId: string,
  updates: Partial<ChurchEntity>
): Record<string, ChurchEntity> {
  const entity = structure[entityId];
  if (!entity) return structure;

  return {
    ...structure,
    [entityId]: { ...entity, ...updates }
  };
}