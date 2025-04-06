import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  maxWidth?: string;
};

/**
 * A standardized modal component that wraps Radix UI Dialog
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footerContent,
  maxWidth = "max-w-4xl",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`${maxWidth} max-h-[90vh] overflow-hidden bg-[#121212] text-white border-[#333]`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-white/70">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <ScrollArea className="mt-4 max-h-[calc(90vh-200px)] pr-4">
          {children}
        </ScrollArea>
        
        <DialogFooter className="mt-4">
          {footerContent || (
            <Button onClick={onClose} className="bg-military hover:bg-military-light">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal; 