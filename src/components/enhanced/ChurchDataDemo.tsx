// CMS DATA SOURCE: Demo component showcasing new data management patterns
// Demonstrates normalized structure, custom hooks, context, and caching

import React from 'react';
import { m } from 'framer-motion';
import { 
  useChurchEntity, 
  useChurchChildren, 
  useParishGroups,
  useMassServices 
} from '@/hooks/useChurchData';
import { useChurchDataContext } from '@/contexts/ChurchDataContext';
import { ChurchEntity } from '@/lib/church-data-model';

// CMS DATA SOURCE: Recursive component to display church hierarchy
interface ChurchTreeProps {
  entityId: string;
  level?: number;
}

function ChurchTree({ entityId, level = 0 }: ChurchTreeProps) {
  // CMS DATA SOURCE: Using custom hooks for data fetching - React docs pattern
  const entity = useChurchEntity(entityId);
  const children = useChurchChildren(entityId);
  
  if (!entity) return null;
  
  const indent = level * 24;
  
  return (
    <div
      style={{ marginLeft: indent }}
      className="border-l border-gray-300 pl-4 py-2"
    >
      <div className="flex items-center space-x-2">
        <span className={`inline-block w-3 h-3 rounded-full ${
          entity.type === 'parish' ? 'bg-gold-500' :
          entity.type === 'ministry' ? 'bg-blue-500' :
          entity.type === 'group' ? 'bg-green-500' :
          entity.type === 'service' ? 'bg-purple-500' :
          'bg-gray-500'
        }`} />
        <span className="font-medium text-gray-900">{entity.title}</span>
        <span className="text-sm text-gray-500 capitalize">({entity.type})</span>
      </div>
      
      {entity.description && (
        <p className="text-sm text-gray-600 mt-1 ml-5">{entity.description}</p>
      )}
      
      {entity.metadata && (
        <div className="ml-5 mt-2 text-xs text-gray-500">
          {entity.metadata.schedule && (
            <p>Schedule: {entity.metadata.schedule.day} {entity.metadata.schedule.time}</p>
          )}
          {entity.metadata.ageGroup && (
            <p>Age Group: {entity.metadata.ageGroup}</p>
          )}
          {entity.metadata.contactInfo?.coordinator && (
            <p>Contact: {entity.metadata.contactInfo.coordinator}</p>
          )}
        </div>
      )}
      
      {children && children.length > 0 && (
        <div className="mt-2">
          {children.map(child => (
            <ChurchTree key={child.id} entityId={child.id} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// CMS DATA SOURCE: Component showing parish groups - simple React docs pattern
function ParishGroupsDemo() {
  const parishGroups = useParishGroups();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Parish Groups</h3>
      
      <div className="space-y-3">
        {parishGroups?.map((group) => (
          <div
            key={group.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <h4 className="font-semibold text-gray-900">{group.title}</h4>
            {group.description && (
              <p className="text-sm text-gray-600 mt-1">{group.description}</p>
            )}
            {group.metadata && (
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                {group.metadata.ageGroup && (
                  <p>Age Group: {group.metadata.ageGroup}</p>
                )}
                {group.metadata.schedule && (
                  <p>
                    Schedule: {group.metadata.schedule.day} {group.metadata.schedule.time}
                    {group.metadata.schedule.frequency && ` (${group.metadata.schedule.frequency})`}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {parishGroups?.length === 0 && (
        <p className="text-gray-500 text-center py-4">No groups available.</p>
      )}
    </div>
  );
}

// CMS DATA SOURCE: Component showing Mass services - simple React docs pattern
function MassServicesDemo() {
  const massServices = useMassServices();
  
  if (!massServices) {
    return <div className="bg-gray-200 h-32 rounded-lg"></div>;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Mass Services</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Weekday Masses</h4>
          <div className="space-y-1">
            {massServices.weekday?.map((mass: any) => (
              <div
                key={`${mass.day}-${mass.time}`}
                className="text-sm text-gray-600"
              >
                {mass.day}: {mass.time}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Weekend Masses</h4>
          <div className="space-y-1">
            {massServices.weekend?.map((mass: any) => (
              <div
                key={`${mass.day}-${mass.time}`}
                className="text-sm text-gray-600"
              >
                {mass.day}: {mass.time}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Special Services</h4>
          <div className="space-y-1">
            {massServices.special?.map((service: any) => (
              <div
                key={`${service.day}-${service.time}`}
                className="text-sm text-gray-600"
              >
                {service.day}: {service.time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// CMS DATA SOURCE: Simple context demo - React docs pattern
function ContextDemo() {
  const cmsContent = useChurchDataContext();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">CMS Content Context</h3>
      
      {cmsContent ? (
        <div className="space-y-2">
          <p><strong>Parish Name:</strong> {cmsContent.parish.name}</p>
          <p><strong>Location:</strong> {cmsContent.parish.location}</p>
          <p><strong>Priest:</strong> {cmsContent.parish.priest}</p>
          <p><strong>Phone:</strong> {cmsContent.contact.phone}</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading content...</p>
      )}
    </div>
  );
}

// CMS DATA SOURCE: Main demo component - simple React docs pattern
export default function ChurchDataDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Church Data Management Demo
          </h1>
          <p className="text-gray-600">
            React official patterns: normalized structure, useData hooks, context, caching
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Church Hierarchy</h2>
            <div className="bg-white rounded-lg shadow-md p-6 max-h-96 overflow-y-auto">
              <ChurchTree entityId="0" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Parish Groups</h2>
            <ParishGroupsDemo />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MassServicesDemo />
          <ContextDemo />
        </div>
      </div>
    </div>
  );
}

export { ChurchDataDemo };