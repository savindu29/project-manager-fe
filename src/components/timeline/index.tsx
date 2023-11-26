import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Divider } from '@mui/material';

const formatDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options as any);
};

const formatDateTime = (dateString: string) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options as any);
};

export default function CenterAlignedTimeline({ statusHistoryList }: any) {
  return (
    <Timeline>
      {statusHistoryList.slice().map((status: any, index: number, array: any[]) => (
        <TimelineItem key={status.id} className="text-center">
          <TimelineOppositeContent color="textSecondary">
            {formatDateTime(status.date)}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            {index < array.length - 1 ? <TimelineConnector /> : null}
          </TimelineSeparator>
          <TimelineContent>
            <div className='text-sm mb-4'>
              {status.description}
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
