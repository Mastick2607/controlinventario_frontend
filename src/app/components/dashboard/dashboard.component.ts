import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ProductsService} from '../../services/products.service';
import {SalesService} from '../../services/sales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartOptions,Chart,ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule,MatPaginatorModule,MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements AfterViewInit,OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // displayedColumns: string[] = ['id', 'name', 'description', 'quantity','price','category_id'];
  // dataSource = new MatTableDataSource<PeriodicElement>([]);

  // displayedColumnsSales: string[] = ['id', 'Producto', 'Cantidad', 'Total','Acciones'];
  // dataSourceSales = new MatTableDataSource<PeriodicElement>([]);  
  
  // products :any;
    TotalSales :number = 0;
    TotalRevenue:number = 0;
    Totalstock:number = 0;

    // public doughnutChartLabels: string[] = [];
    // public doughnutChartData: ChartData<'pie'> = {
    //   labels: [],
    //   datasets: [
    //     {
    //       data: [],
    //       backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'], // Colores vivos
    //       hoverBackgroundColor: ['#d62839', '#1357a6', '#c79100', '#3b8686', '#6a0dad'],
    //     },
    //   ],
    // };

    public basechart:Chart;

     // Configuración del gráfico
  public lineChartData: ChartData<'line'> = {
    labels: [], // Se llenará dinámicamente con los nombres de los productos
    datasets: [
      {
        data: [], // Se llenará con las cantidades de los productos
        label: 'Stock de Productos',
        borderColor: 'blue',
        backgroundColor: '#007bff',
         hoverBackgroundColor: '#0056b3',
        fill: true
      }
    ]
  };

  public lineChartOptions: ChartOptions = {
    responsive: true
  };


  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSourceSales.paginator = this.paginator;
  }
  constructor(
    private router: Router,
    private _productsService: ProductsService,
    private _salesservice: SalesService
   ){
  }

  ngOnInit(): void {
   this.getlowStockProducts();
   this.getSalesServiceXProducts();
   this.getTotalsalesP();
   this.getTotalRevenueP();
   this.getTotalstockP();
  }

  // createChart(): void {
  //   const data: ChartData<'pie'> = {
  //     labels: [],
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [],
  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 205, 86)'
  //       ],
  //       hoverOffset: 4
  //     }]
  //   };

  //   this.basechart = new Chart("chart", {
  //     type: 'pie' as ChartType, // Define el tipo de gráfico
  //     data
  //   });
  // }



  initChart(labels: string[], values: number[]): void {
    const chartElement = document.getElementById('chart') as HTMLCanvasElement;
    
    if (!chartElement) {
      console.error('No se encontró el canvas con id "chart".');
      return;
    }
  
    // Destruir el gráfico anterior si ya existe
    if (this.basechart) {
      this.basechart.destroy();
    }
  
    this.basechart = new Chart(chartElement, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ventas por Producto',
          data: values,
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  

  
  getlowStockProducts() {
    this._productsService.getlowStock().subscribe((data: any) => {
      // this.dataSource.data = data.products;
  if (data.products) {
        const productNames = data.products.map((p: any) => p.name);
        const productQuantities = data.products.map((p: any) => p.quantity);

        this.lineChartData.labels = productNames;
        this.lineChartData.datasets[0].data = productQuantities;

        this.chart?.update(); // Actualiza el gráfico después de recibir los datos
      }
      console.log(data);
    
    })
  }


  getSalesServiceXProducts() {
    this._salesservice.getLatestSales().subscribe((data: any) => {
      if (data.sales && data.sales.length > 0) {
        const labels = data.sales.map((sale: any) => sale.product.name);
        const values = data.sales.map((sale: any) => sale.quantity);
  
        this.initChart(labels, values); // Creamos o actualizamos el gráfico
      } else {
        console.warn("No hay ventas registradas para graficar.");
      }
      console.log(data);
    });
  }
  
  

  getTotalsalesP() {
    this._salesservice.getTotalsales().subscribe((data: any) => {
      this.TotalSales = data.totalsales;
      console.log(data.totalsales);
    
    })
  }

  getTotalRevenueP() {
    this._salesservice.getTotalRevenue().subscribe((data: any) => {
      this.TotalRevenue = data.totalRevenue;
      console.log(data);
    
    })
  }

  getTotalstockP() {
    this._productsService.getTotalstock().subscribe((data: any) => {
      this.Totalstock = data.totalStock;
      console.log(data);
    
    })
  }

  mostrarDetalle(id: number) {
    this.router.navigate(['/salesdetail',id]);
  }
 
}
export interface PeriodicElement {
  id: number;
  name: string;
  description: string;
  quantity: number; // Entero
  price: number; // Decimal
  category_id: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  // {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  // {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  // {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  // {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  // {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  // {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  // {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  // {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  // {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  // {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];