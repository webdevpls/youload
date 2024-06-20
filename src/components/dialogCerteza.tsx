import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogCerteza() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button type="submit" className="bg-white text-[#434343] w-full rounded flex items-center justify-center hover:bg-slate-200">
                Cadastrar
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[635px] bg-[#050506] border border-[#27272A]">
        <DialogHeader>
          <DialogTitle className="text-white font-bold">Tem certeza que deseja cadastrar esta pessoa?</DialogTitle>
          <DialogDescription className="text-gray-500">
          Certifique-se se todos os dados estão corretos antes de finalizar o processo de cadastramento.         
           </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
        <Button type="submit" className="bg-[#050506] border border-[#27272A] text-white rounded flex items-center justify-center hover:bg-[#000000]">
                Cancelar
        </Button>
        </DialogClose>
        <Button type="submit" className="bg-white text-[#434343] rounded flex items-center justify-center hover:bg-slate-200">
                Tenho certeza
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
