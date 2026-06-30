import { X } from "lucide-react";

type ToastProps = {
  message: string | null;
  onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_18px_60px_rgba(101,120,151,0.18)] backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="flex-1 text-sm leading-6 text-slate-700">{message}</div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Fechar notificação"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}